// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./royalty.sol";

contract UnboundIP is ERC721, Ownable {
    uint256 private _nextTokenId;
    


    mapping(uint256 => IPMetadata) public tokenMetadata;
    mapping(uint256 => bool) public mintedTokens; 

    struct IPMetadata {
        string title;
        string description;
    }

    constructor(address initialOwner,  address _royaltyTokenAddress)
        ERC721("UnboundIP", "UBIP")
        Ownable(initialOwner)
        
    {
        
    }



    function safeMint(address to, string memory _title, string memory _description) public onlyOwner {
        uint256 tokenId = _nextTokenId++;

        tokenMetadata[tokenId] = IPMetadata({title: _title, description: _description}); // Store metadata

        
        _safeMint(to, tokenId);

    }

      // Function to retrieve metadata for a specific token ID
    function getMetadata(uint256 tokenId) public view returns (IPMetadata memory) {
        require(mintedTokens[tokenId], "Token ID does not exist");
        return tokenMetadata[tokenId];
    }

    function ping() public pure returns (string memory) {
        return "Pong!";
    }
}