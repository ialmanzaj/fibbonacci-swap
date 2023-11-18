// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ResultsConsumer} from "./ResultsConsumer.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title
 * @notice
 */
contract FibbonacciEscrow is ResultsConsumer, AutomationCompatibleInterface {
    using SafeERC20 for IERC20;

    /// @notice Mapping of escrow IDs to escrows data
    mapping(uint256 => Escrow) public escrows;

    /// @notice Mapping of escrow IDs to Chainlink Functions request IDs
    mapping(uint256 => bytes32) private pendingRequests;
    uint256[] private activeEscrows;

    // STRUCTS

    struct Escrow {
        uint256 createdAt; // The timestamp of created
        uint256 finishedAt; // The timestamp of the escrow finished time
        uint256 deadline; // The total deadline of the deal
        uint256 dealAmount; //  crypto amount
        uint256 totalPriceExchange; // the fiat amount
        address taker; // the buyer address
        address maker; // the seller address
        EscrowStatus status;
        IERC20 currency; // currency in custody
    }

    // EVENTS
    event EscrowAccepted(uint256 indexed orderId, Escrow escrow);
    event EscrowReleased(uint256 indexed orderId, Escrow escrow);

    enum EscrowStatus {
        PENDING,
        ACTIVE,
        IN_CUSTODY,
        FIAT_RELEASED,
        COMPLETED
    }

    // ERRORS
    error Escrow__DepositAmountMustBeGreaterThanZero();
    error Escrow__PriceExchangetMustBeGreaterThanZero();
    error Escrow__IsZeroAddress();
    error Escrow__WithdrawalHasAlreadyBeenExecuted();
    error Escrow__IsAlreadyActive();
    error Escrow__BuyerCannotBeSameAsSeller();
    error Escrow__StatusShoudBeCustody();

    // CONSTRUCTOR

    constructor(
        address _router,
        string memory _source,
        bytes memory _encryptedSecretsUrls,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donId
    ) ResultsConsumer(_router, _source, _encryptedSecretsUrls, _subscriptionId, _gasLimit, _donId) {}

    // ACTIONS

    function takeDeal(
        uint256 _orderId,
        uint256 _amount,
        uint256 _totalPriceExchange,
        uint256 _deadline,
        address maker,
        IERC20 _currency
    ) external {
        if (_totalPriceExchange == 0) {
            revert Escrow__PriceExchangetMustBeGreaterThanZero();
        }
        if (_amount == 0) {
            revert Escrow__DepositAmountMustBeGreaterThanZero();
        }
        if (maker == msg.sender) {
            revert Escrow__BuyerCannotBeSameAsSeller();
        }

        // Add the escrow to the active escrows list
        activeEscrows.push(_orderId);

        //transfer stablecoin to contract
        _currency.safeTransferFrom(msg.sender, address(this), _amount);

        // set taker data
        escrows[_orderId].taker = msg.sender;
        escrows[_orderId].dealAmount = _amount;
        escrows[_orderId].totalPriceExchange = _totalPriceExchange;

        // update escrow data
        escrows[_orderId].maker = maker;
        escrows[_orderId].status = EscrowStatus.ACTIVE;
        escrows[_orderId].createdAt = block.timestamp;
        escrows[_orderId].deadline = _deadline;
        escrows[_orderId].currency = _currency;

        emit EscrowAccepted(_orderId, escrows[_orderId]);
    }

    /// @notice Get the data of a escrow
    /// @param orderId The ID of the escrow
    function getEscrow(uint256 orderId) external view returns (Escrow memory) {
        return escrows[orderId];
    }

    /// @notice Request the result of a escrow from the external fintech API
    /// @param orderId The ID of the escrow
    /// @dev Uses Chainlink Functions via the ResultsConsumer contract
    function requestArbitration(uint256 orderId) public {
        Escrow memory escrow = escrows[orderId];

        // Request the result of the escrow via ResultsConsumer contract
        // Store the Chainlink Functions request ID to prevent duplicate requests
        pendingRequests[orderId] =
            _requestResult(orderId, escrow.maker, escrow.taker, escrow.dealAmount, escrow.createdAt);
    }

    /// @notice Process the result of a escrow from the external fintech API
    /// @param orderId The ID of the sport
    /// @param response The result of the escrow
    /// @dev Called back by the ResultsConsumer contract when the result is received
    function _processResult(uint256 orderId, bytes memory response) internal override {
        //(uint256 amount, uint256 hasSentFiat) = abi.decode(response, (uint256, uint256));

        // if (hasSentFiat == 1) release(orderId, amount);

        _release(orderId);
    }

    // @notice Resolve a escrow with a final result
    function _release(uint256 _orderId) private {
        // update escrow data
        escrows[_orderId].status = EscrowStatus.COMPLETED;

        //escrows[_orderId].currency.safeTransfer(escrows[_orderId].taker, _amount);
        emit EscrowReleased(_orderId, escrows[_orderId]);
    }

    /// @notice Check if a escrow is ready to be resolved
    /// @param orderId The ID of the escrow
    /// @return ready Whether or not the escrow is ready to be resolved
    /// @dev The escrow must be registered and not resolved
    /// @dev Used by Chainlink Automation to determine if a escrow result should be requested
    function readyToResolve(uint256 orderId) public view returns (bool) {
        return escrows[orderId].status == EscrowStatus.ACTIVE;
    }

    // CHAINLINK AUTOMATION

    /// @notice Check if any escrows are ready to be resolved
    /// @dev Called by Chainlink Automation to determine if a escrow result should be requested
    function checkUpkeep(bytes memory) public view override returns (bool, bytes memory) {
        // Get all escrows that can be resolved
        for (uint256 i = 0; i < activeEscrows.length; i++) {
            uint256 orderId = activeEscrows[i];
            if (readyToResolve(orderId)) {
                // Signal that a escrow is ready to be resolved to Chainlink Automation
                return (true, abi.encodePacked(orderId));
            }
        }
        return (false, "");
    }

    /// @notice Request the result of a escrow
    /// @dev Called back by Chainlink Automation when a escrow is ready to be resolved
    function performUpkeep(bytes calldata data) external override {
        uint256 orderId = abi.decode(data, (uint256));
        requestArbitration(orderId);
    }

    // OWNER

    /// @notice Delete a failed Chainlink Functions request to restart the escrow resolve process
    /// @param orderId The ID of the escrow
    /// @dev Manual intervention required or the automation will retry indefinitely
    function deletePendingRequest(uint256 orderId) external onlyOwner {
        delete pendingRequests[orderId];
    }
}
