// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract donorToken is ERC20, ERC20Permit, ERC20Votes {
    constructor()
        ERC20("UnboundScience", "UBSi")
        ERC20Permit("MyToken")
    {}

    address public vault=0x9Fa4aCC9991Fd81bd7023d4E2665F31d06332ea6;

    function mint(uint256 amount) public payable {
        _mint(msg.sender, amount);
        payable(vault).transfer(msg.value); // Transfer ETH received to the vault
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }

    function ping() public pure returns (string memory) {
        return "Pong!";
    }
}