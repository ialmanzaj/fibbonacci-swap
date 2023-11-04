//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Balloons is ERC20 {
    constructor(address deployer) ERC20("Balloons", "BAL") {
        _mint(deployer, 1000 ether); // mints 1000 balloons!
    }
}