// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// @title ResultsConsumer
/// @notice Requests and receives fintech results using Chainlink Functions
abstract contract ResultsConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    /// @notice The source code for the fintech API request
    string private source;

    /// @notice The secrets used in the fintech API request
    bytes private encryptedSecretsUrls;

    /// @notice The subscription ID for Chainlink Functions
    uint64 private subscriptionId;

    /// @notice The gas limit for the fintech API request callback
    uint32 private gasLimit;

    bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

    /// @notice The pending Functions requests
    mapping(bytes32 => PendingRequest) private pending;

    // STRUCTS

    struct PendingRequest {
        uint256 orderId;
    }

    // EVENTS
    event RequestedResult(uint256 orderId, bytes32 requestId);
    event ResultReceived(bytes32 indexed requestId, bytes response);
    event NoPendingRequest();
    event RequestFailed(bytes response);

    // Errors
    error UnexpectedRequestID(bytes32 requestId);

    // CONSTRUCTOR

    /// @notice Initializes the contract

    constructor(
        address _router,
        string memory _source,
        bytes memory _encryptedSecretsUrls,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donId
    ) FunctionsClient(_router) ConfirmedOwner(msg.sender) {
        encryptedSecretsUrls = _encryptedSecretsUrls;
        source = _source;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donId = _donId;
    }

    // INTERNAL

    /// @notice Requests a fintech API result
    function _requestResult(uint256 orderId, address maker, address taker, uint256 amount, uint256 startedAt)
        internal
        returns (bytes32 requestId)
    {
        // Prepare the arguments for the Chainlink Functions request
        string[] memory args = new string[](4);
        args[0] = Strings.toHexString(uint256(uint160(maker)), 20);
        args[1] = Strings.toHexString(uint256(uint160(taker)), 20);
        args[2] = Strings.toString(amount);
        args[3] = Strings.toString(startedAt);

        // Send the Chainlink Functions request
        requestId = _executeRequest(args);

        // Store the request and the associated data for the callback
        pending[requestId] = PendingRequest({orderId: orderId});
        emit RequestedResult(orderId, requestId);
    }

    /// @notice Sends a Chainlink Functions request
    /// @param args The arguments for the Chainlink Functions request
    /// @return requestId The Chainlink Functions request ID
    function _executeRequest(string[] memory args) internal returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0) {
            req.addSecretsReference(encryptedSecretsUrls);
        }
        if (args.length > 0) {
            req.setArgs(args);
        }
        requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donId);
    }

    function updateRequest(bytes calldata _encryptedSecretsUrls) external onlyOwner {
        encryptedSecretsUrls = _encryptedSecretsUrls;
    }

    /// @notice Processes the result of a fintech API request
    /// @param orderId The ID of the sport
    /// @param response The response from the Chainlink Functions request
    /// @dev This function must be implemented by the child contract
    function _processResult(uint256 orderId, bytes memory response) internal virtual;

    // CHAINLINK FUNCTIONS

    /// @notice Receives the response to a Chainlink Functions request
    /// @param requestId The Chainlink Functions request ID
    /// @param response The response from the Chainlink Functions request
    /// @param err The error from the Chainlink Functions request
    /// @dev This function is called by the oracle
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        PendingRequest memory _request = pending[requestId];
        // Check if there is a sent request
        if (_request.orderId == 0) {
            emit NoPendingRequest();
            return;
        }
        delete pending[requestId];
        // Check if the Functions script failed
        if (err.length > 0) {
            emit RequestFailed(err);
            return;
        }
        emit ResultReceived(requestId, response);

        // Call the child contract to process the result
        _processResult(_request.orderId, response);
    }
}
