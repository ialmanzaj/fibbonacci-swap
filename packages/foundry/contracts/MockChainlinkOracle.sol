pragma solidity 0.8.19;

/**
 * @dev simple contract that will help us send transactions in localhost
 */

interface IFunctionConsumer {
    function mockHandleFulfillRequest(bytes32, bytes memory, bytes memory) external;
}

contract MockChainlinkOracle {
    bytes32 private DONPublicKey;
    address private functionsConsumer;

    constructor(bytes32 _DONPublicKey) {
        DONPublicKey = _DONPublicKey;
    }

    function getDONPublicKey() external view returns (bytes32) {
        return DONPublicKey;
    }

    function setFunctionsConsumer(address _functionsConsumer) external {
        functionsConsumer = _functionsConsumer;
    }

    function mockHandleFulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) external {
        IFunctionConsumer(functionsConsumer).mockHandleFulfillRequest(requestId, response, err);
    }
}
