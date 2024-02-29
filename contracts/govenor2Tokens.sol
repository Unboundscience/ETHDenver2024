// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract UnboundGovernor {
    address votingToken;
    address nftContract;
    constructor(address _votingToken, address _propNFT)
    {
        votingToken = _votingToken;
        nftContract = _propNFT;
    }

    uint256 public proposalThreshold;
    uint256 public votingPeriod = 7200;

    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) private votes;

    uint256 public nextProposalId = 1; // Counter for proposal IDs

    struct Proposal {
        string title; // Short descriptive title of the proposal
        address nftContract; // Address of the proposal NFT contract
        uint256 tokenId; // ID of the proposal NFT
        string description; // Detailed description of the proposal
        address proposer; // Address of the proposal creator
        uint256 votingStart; // Block number when voting starts
        uint256 votingEnd; // Block number when voting ends
        uint256 forVotes; // Number of votes in favor of the proposal
        bool executed; // Flag indicating if the proposal has been executed
    }

    function propose(
        string memory title,
        string memory description,
        uint256 tokenId
    ) public {
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Proposer must own the proposal NFT");
        proposals[nextProposalId] = Proposal({
        title: title,
        description: description,
        nftContract: nftContract,
        tokenId: tokenId,
        proposer: msg.sender,
        votingStart: block.number,
        votingEnd: block.number + votingPeriod,
        forVotes: 0,
        executed: false
    });

  nextProposalId++;
}
    mapping(address => mapping(uint256 => bool)) private hasVoted;
    // Function to cast a vote on a proposal (replace with actual implementation)
    function vote(uint256 proposalId, bool voteChoice) public {
        require(block.number > proposals[proposalId].votingStart && block.number <= proposals[proposalId].votingEnd, "Voting period has closed");
        require(IERC20(votingToken).balanceOf(msg.sender) > 0, "Voter must hold voting tokens");

        // Calculate voting weight based on token balance (adjust scaling factor as needed)
        uint256 votingWeight = IERC20(votingToken).balanceOf(msg.sender);

        // Prevent double voting
        

        require(!hasVoted[msg.sender][proposalId], "Already voted on this proposal");
        // Update vote counts based on choice
        if (voteChoice) {
            proposals[proposalId].forVotes += votingWeight;
        }

        // Record vote for duplicate voting prevention
        votes[msg.sender][proposalId] = true;
    }

    // Function to execute a passed proposal (replace with actual implementation)
    function execute(uint256 proposalId) public {
        require(block.number > proposals[proposalId].votingEnd, "Voting period is still ongoing");
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(proposals[proposalId].forVotes >= quorum(), "Proposal did not pass");
        
        proposals[proposalId].executed = true;
    }


    function quorum() view  internal returns (uint256) {
        uint256 totalSupply = IERC20(votingToken).totalSupply();
        uint256 baseQuorum = 1; // Set a base quorum value
        return baseQuorum;
    }

    function setVotingPeriod(uint _votingPeriod) public  {
        votingPeriod = _votingPeriod;
    }
}
