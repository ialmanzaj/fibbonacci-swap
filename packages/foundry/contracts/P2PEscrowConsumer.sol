// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/console.sol";
import {ResultsConsumer} from "./ResultsConsumer.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title
 * @notice
 */
contract P2PEscrow is ResultsConsumer, AutomationCompatibleInterface {
    /// @notice Mapping of escrow IDs to escrows data
    mapping(uint256 => Escrow) public escrows;

    /// @notice Mapping of escrow IDs to Chainlink Functions request IDs
    mapping(uint256 => bytes32) private pendingRequests;
    uint256[] private activeEscrows;

    // STRUCTS
    struct Actor {
        address payable wallet;
        string userUniqueId;
        string linkId;
        string accountId;
    }

    struct Escrow {
        uint256 createdAt; // The timestamp of created
        uint256 orderId; // The ID of the order
        Actor maker; // maker is the seller
        Actor taker; // taker is the buyer
        uint256 amount; // amount in custody
        uint256 amountToBuy; // amount buyer wants
        IERC20 currency; // currency in custody
        uint256 startedAt; // The timestamp of the escrow start time
        EscrowStatus status;
    }

    // EVENTS
    event EscrowAccepted(uint256 indexed orderId, Escrow escrow);
    event EscrowDeposited(uint256 indexed orderId, Escrow escrow);
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
    error Escrow__IsZeroAddress();
    error Escrow__WithdrawalHasAlreadyBeenExecuted();
    error Escrow__TransferFailed();
    error Escrow__IsAlreadyActive();
    error Escrow__BuyerCannotBeSameAsSeller();
    error Escrow__StatusShoudBeCustody();

    // CONSTRUCTOR

    constructor(address _router) ResultsConsumer(_router) {}

    // ACTIONS

    function updateEscrow(uint256 _orderId, string memory linkId, string memory _accountId) external onlyOwner {
        escrows[_orderId].taker.linkId = linkId;
        escrows[_orderId].taker.accountId = _accountId;
    }

    function deposit(uint256 _orderId, string memory _makerId, uint256 _amount) public {
        if (escrows[_orderId].status == EscrowStatus.ACTIVE) {
            revert Escrow__IsAlreadyActive();
        }

        if (_amount == 0) {
            revert Escrow__DepositAmountMustBeGreaterThanZero();
        }

        //transfer stablecoin to contract
        //_token.safeTransferFrom(msg.sender, address(this), _amount);

        escrows[_orderId] = Escrow(
            block.timestamp, // timestamp created
            _orderId, // the current orderId
            Actor(payable(msg.sender), _makerId, "", ""), // maker
            Actor(payable(address(0)), "", "", ""), // taker
            _amount, // amount in custody
            0, //
            IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48),
            // currency any stablecoin
            0, // startedAt inital value
            EscrowStatus.IN_CUSTODY // status
        );

        emit EscrowDeposited(_orderId, escrows[_orderId]);
    }

    function accept(uint256 _orderId, uint256 _amount, string memory _linkId, string memory _accountId) external {
        if (escrows[_orderId].taker.wallet == msg.sender) {
            revert Escrow__BuyerCannotBeSameAsSeller();
        }

        if (escrows[_orderId].status != EscrowStatus.IN_CUSTODY) {
            revert Escrow__IsAlreadyActive();
        }

        // Add the escrow to the active escrows list
        activeEscrows.push(_orderId);

        // set taker data
        escrows[_orderId].taker.linkId = _linkId;
        escrows[_orderId].taker.accountId = _accountId;
        escrows[_orderId].taker.wallet = payable(msg.sender);
        escrows[_orderId].amountToBuy = _amount;

        // update escrow data
        escrows[_orderId].status = EscrowStatus.ACTIVE;
        escrows[_orderId].startedAt = block.timestamp;

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
    function _requestResolve(uint256 orderId) internal {
        Escrow memory escrow = escrows[orderId];

        // Request the result of the escrow via ResultsConsumer contract
        // Store the Chainlink Functions request ID to prevent duplicate requests
        pendingRequests[orderId] =
            _requestResult(orderId, escrow.taker.linkId, escrow.taker.accountId, escrow.maker.userUniqueId);
    }

    /// @notice Get the data of all active escrows
    /// @return activeEscrowsArray An array of all active escrows data
    function getActiveEscrows() public view returns (Escrow[] memory) {
        Escrow[] memory activeEscrowsArray = new Escrow[](activeEscrows.length);
        for (uint256 i = 0; i < activeEscrows.length; i++) {
            activeEscrowsArray[i] = escrows[activeEscrows[i]];
        }
        return activeEscrowsArray;
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

    /* function _resolveGame(uint256 escrowId, Result result) internal {
        // Store the escrow result and mark the escrow as finished
        escrows[escrowId].result = result;
        escrows[escrowId].resolved = true;
        // Add the escrow to the finished escrows list
        resolvedGames.push(escrowId);
        _removeFromActiveGames(escrowId);
        emit GameResolved(escrowId, result);
    } */

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
        _requestResolve(orderId);
    }

    // OWNER

    /// @notice Delete a failed Chainlink Functions request to restart the escrow resolve process
    /// @param orderId The ID of the escrow
    /// @dev Manual intervention required or the automation will retry indefinitely
    function deletePendingRequest(uint256 orderId) external onlyOwner {
        delete pendingRequests[orderId];
    }
}
