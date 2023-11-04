// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ResultsConsumer} from "./ResultsConsumer.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title
 * @notice
 */
contract P2PEscrowConsumer is ResultsConsumer, AutomationCompatibleInterface {
    /// @notice Mapping of game IDs to escrows data
    mapping(uint256 => Escrow) public escrows;

    /// @notice Mapping of game IDs to Chainlink Functions request IDs
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
        uint256 startedAt; // The timestamp of the game start time
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

    constructor(address _router, bytes32 _donId) ResultsConsumer(_router, _donId) {}

    // ACTIONS

    function deposit(uint256 _orderId, string memory _makerUniqueId, uint256 _amount) external {
        if (escrows[_orderId].status == EscrowStatus.ACTIVE) {
            revert Escrow__IsAlreadyActive();
        }

        if (_amount == 0) {
            revert Escrow__DepositAmountMustBeGreaterThanZero();
        }

        //transfer stablecoin to contract
        // _currency.safeTransferFrom(msg.sender, address(this), _amount);

        escrows[_orderId] = Escrow(
            block.timestamp, // timestamp created
            _orderId, // the current orderId
            Actor(payable(msg.sender), _makerUniqueId, "", ""), // maker
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

    function accept(uint256 _orderId, uint256 _amount, string memory _takerLinkId, string memory _takerAccountId)
        external
    {
        if (escrows[_orderId].taker.wallet == msg.sender) {
            revert Escrow__BuyerCannotBeSameAsSeller();
        }

        if (escrows[_orderId].status != EscrowStatus.IN_CUSTODY) {
            revert Escrow__IsAlreadyActive();
        }

        // Add the game to the active games list
        activeEscrows.push(_orderId);

        // set taker data
        escrows[_orderId].taker.linkId = _takerLinkId;
        escrows[_orderId].taker.accountId = _takerAccountId;
        escrows[_orderId].taker.wallet = payable(msg.sender);
        escrows[_orderId].amountToBuy = _amount;

        // update escrow data
        escrows[_orderId].status = EscrowStatus.ACTIVE;
        escrows[_orderId].startedAt = block.timestamp;

        emit EscrowAccepted(_orderId, escrows[_orderId]);
    }

    function release(uint256 _orderId, uint256 _amount) private {
        //escrows[_orderId].currency.safeTransfer(escrows[_orderId].taker, _amount);
        emit EscrowReleased(_orderId, escrows[_orderId]);
    }

    /// @notice Get the data of a game
    /// @param orderId The ID of the game
    function getEscrow(uint256 orderId) external view returns (Escrow memory) {
        return escrows[orderId];
    }

    /// @notice Request the result of a game from the external sports API
    /// @param orderId The ID of the game
    /// @dev Uses Chainlink Functions via the ResultsConsumer contract
    function _requestResolve(uint256 orderId) internal {
        Escrow memory escrow = escrows[orderId];

        // Request the result of the game via ResultsConsumer contract
        // Store the Chainlink Functions request ID to prevent duplicate requests
        pendingRequests[orderId] = _requestResult(
            orderId,
            escrow.taker.linkId,
            escrow.taker.accountId,
            escrow.maker.userUniqueId,
            escrow.amountToBuy,
            escrow.startedAt
        );
    }

    /// @notice Get the data of all active games
    /// @return activeEscrowsArray An array of all active games data
    function getActiveEscrows() public view returns (Escrow[] memory) {
        Escrow[] memory activeEscrowsArray = new Escrow[](activeEscrows.length);
        for (uint256 i = 0; i < activeEscrows.length; i++) {
            activeEscrowsArray[i] = escrows[activeEscrows[i]];
        }
        return activeEscrowsArray;
    }

    /// @notice Remove a game from the active games list
    /// @param orderId The ID of the game
    function _removeFromActiveEscrows(uint256 orderId) internal {
        uint256 index;
        for (uint256 i = 0; i < activeEscrows.length; i++) {
            if (activeEscrows[i] == orderId) {
                index = i;
                break;
            }
        }
        for (uint256 i = index; i < activeEscrows.length - 1; i++) {
            activeEscrows[i] = activeEscrows[i + 1];
        }
        activeEscrows.pop();
    }

    /// @notice Process the result of a game from the external sports API
    /// @param orderId The ID of the sport
    /// @param response The result of the game
    /// @dev Called back by the ResultsConsumer contract when the result is received
    function _processResult(uint256 orderId, bytes memory response) internal override {
        (uint256 amount, uint256 hasSentFiat) = abi.decode(response, (uint256, uint256));

        if (hasSentFiat == 1) release(orderId, amount);

        // _resolveGame(gameId, result);
    }

    /// @notice Resolve a game with a final result
    /// @param gameId The ID of the game
    /// @param result The result of the game
    /// @dev Removes the game from the active games list
    /* function _resolveGame(uint256 gameId, Result result) internal {
        // Store the game result and mark the game as finished
        games[gameId].result = result;
        games[gameId].resolved = true;

        // Add the game to the finished games list
        resolvedGames.push(gameId);
        _removeFromActiveGames(gameId);

        emit GameResolved(gameId, result);
    } */

    /// @notice Check if a game is ready to be resolved
    /// @param orderId The ID of the game
    /// @return ready Whether or not the game is ready to be resolved
    /// @dev The game must be registered and not resolved
    /// @dev Used by Chainlink Automation to determine if a game result should be requested
    function readyToResolve(uint256 orderId) public view returns (bool) {
        return escrows[orderId].status == EscrowStatus.ACTIVE;
    }

    // CHAINLINK AUTOMATION

    /// @notice Check if any games are ready to be resolved
    /// @dev Called by Chainlink Automation to determine if a game result should be requested
    function checkUpkeep(bytes memory) public view override returns (bool, bytes memory) {
        /* // Get all games that can be resolved
        Escrow[] memory _activeEscrows = getActiveEscrows();
        // Check if any game is ready to be resolved and have not already been requested
        for (uint256 i = 0; i < _activeEscrows.length; i++) {
            uint256 orderId = _activeEscrows[i].orderId;
            if (readyToResolve(orderId)) {
                // Signal that a game is ready to be resolved to Chainlink Automation
                return (true, abi.encodePacked(orderId));
            }
        } */
        Escrow[] memory _activeEscrows = getActiveEscrows();
        uint256 orderId = _activeEscrows[0].orderId;
        if (readyToResolve(orderId)) {
            // Signal that a game is ready to be resolved to Chainlink Automation
            return (true, abi.encodePacked(orderId));
        }
        return (false, "");
    }

    /// @notice Request the result of a game
    /// @dev Called back by Chainlink Automation when a game is ready to be resolved
    function performUpkeep(bytes calldata data) external override {
        uint256 orderId = abi.decode(data, (uint256));
        _requestResolve(orderId);
    }

    // OWNER

    /// @notice Delete a failed Chainlink Functions request to restart the game resolve process
    /// @param orderId The ID of the game
    /// @dev Manual intervention required or the automation will retry indefinitely
    function deletePendingRequest(uint256 orderId) external onlyOwner {
        delete pendingRequests[orderId];
    }
}
