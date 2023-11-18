//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FibbonacciEscrow, IERC20} from "../contracts/FibbonacciEscrow.sol";
import {Balloons} from "../contracts/Balloons.sol";
import {MockChainlinkOracle} from "../contracts/MockChainlinkOracle.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    address public chainlinkOracle; // NOTE : set this address if you want to deploy to live network
    bytes32 DON = bytes32("DON_PUBLIC_KEY");
    uint32 public gasLimit = 300000;
    uint64 public subscriptionId = 0;
    string private constant source = "";
    bytes private constant secrets = "";

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        if (isLocalhost()) {
            MockChainlinkOracle mockChainlinkOracle = new MockChainlinkOracle(
                DON
            );
            chainlinkOracle = address(mockChainlinkOracle);
        }

        vm.startBroadcast(deployerPrivateKey);

        Balloons ballons = new Balloons(0x02C48c159FDfc1fC18BA0323D67061dE1dEA329F);

        FibbonacciEscrow escrowConsumer =
            new FibbonacciEscrow(chainlinkOracle, source, secrets, subscriptionId, gasLimit, DON);

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
