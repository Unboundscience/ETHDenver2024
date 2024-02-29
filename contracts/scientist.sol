// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScientistToken is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("UboundScientist", "UBSC")
        Ownable(initialOwner)
    {}

      mapping(address => bool) public isScientist;

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
        isScientist[to] = true;
    }

    function getIsScientist(address addr) public view returns (bool) {
    return isScientist[addr];
    }

}


