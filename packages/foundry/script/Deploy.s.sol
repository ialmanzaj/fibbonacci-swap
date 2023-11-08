//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {P2PEscrow, IERC20} from "../contracts/P2PEscrow.sol";
import {P2PEscrowConsumer} from "../contracts/P2PEscrowConsumer.sol";
import {Balloons} from "../contracts/Balloons.sol";
import {MockChainlinkOracle} from "../contracts/MockChainlinkOracle.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    address public chainlinkOracle; // NOTE : set this address if you want to deploy to live network
    bytes32 DONPublicKey = bytes32("DON_PUBLIC_KEY");

    error InvalidPrivateKey(string);

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        if (isLocalhost()) {
            MockChainlinkOracle mockChainlinkOracle = new MockChainlinkOracle(
                DONPublicKey
            );
            chainlinkOracle = address(mockChainlinkOracle);
        }

        vm.startBroadcast(deployerPrivateKey);

        Balloons ballons = new Balloons(
            0x02C48c159FDfc1fC18BA0323D67061dE1dEA329F
        );

        P2PEscrowConsumer escrowConsumer = new P2PEscrowConsumer(chainlinkOracle);

        if (isLocalhost()) {
            MockChainlinkOracle(chainlinkOracle).setFunctionsConsumer(address(escrowConsumer));
        }

        console.logString(string.concat("P2PEscrow deployed at: ", vm.toString(address(escrowConsumer))));
        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
