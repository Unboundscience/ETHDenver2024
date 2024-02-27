// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScientistToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("UboundScientist", "UBSC")
        Ownable(initialOwner)
    {}

      mapping(address => bool) public isScientist;

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        isScientist[to] = true;
    }
}