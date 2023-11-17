// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {P2PEscrowConsumer} from "../contracts/P2PEscrowConsumer.sol";
import {MockChainlinkOracle} from "../contracts/MockChainlinkOracle.sol";

interface ERC20 {
    function approve(address spender, uint256 amount) external;
    function transfer(address recipient, uint256 amount) external;
    function transferFrom(address sender, address recipient, uint256 amount) external;
    function balanceOf(address holder) external returns (uint256);
}

contract P2PEscrowConsumerTest is Test {
    P2PEscrowConsumer public escrow;
    MockChainlinkOracle public mockChainlinkOracle;

    bytes32 public constant DON = bytes32("DON_PUBLIC_KEY");
    ERC20 public constant USDT = ERC20(0xc2132D05D31c914a87C6611C10748AEb04B58e8F); // 6 decimals

    string private constant source = "";
    address public maker = address(0x1);
    address public taker = address(0x2);

    function setUp() public {
        mockChainlinkOracle = new MockChainlinkOracle(DON);
        //escrow = new P2PEscrowConsumer(address(mockChainlinkOracle));
    }

    function convertTo(bytes memory c) public pure returns (string memory) {
        return string(abi.encodePacked(c));
    }

    function testSettle() public {}
}
