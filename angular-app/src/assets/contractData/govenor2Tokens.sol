// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ip.sol";
import "./royalty.sol";

contract UnboundGovernor {
    address votingToken;
    address nftContract;
    address IPContract;
    constructor(address _votingToken, address _propNFT, address _ipContract, address _royaltyTokenAddress)
    {
        votingToken = _votingToken;
        nftContract = _propNFT;
        IPContract = _ipContract;
        royaltyTokenAddress = _royaltyTokenAddress;
    }
    
    uint256 public proposalThreshold;
    uint256 public votingPeriod = 7200;
    mapping(uint256 => uint256) public erc20TokenBalances; // Map token ID to corresponding ERC20 balance

    address public royaltyTokenAddress; // Store address of the ERC20 token contract

    mapping(uint256 => address) public ipTokenHolders; // Map token ID to IP token holder address
    mapping(uint256 => address) public royaltyTokenHolders; // Map token ID to royalty token holder address


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
    function execute(uint256 proposalId, address _to) public {
        require(block.number > proposals[proposalId].votingEnd, "Voting period is still ongoing");
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(proposals[proposalId].forVotes >= quorum(), "Proposal did not pass");
        
        address to = _to;
        string memory title = proposals[proposalId].title;
        string memory description = proposals[proposalId].description;
        UnboundIP ipContract = UnboundIP(IPContract);
        ipContract.safeMint(to, title, description);
        proposals[proposalId].executed = true;

        // Access token ID from the proposal
        uint256 tokenId = proposals[proposalId].tokenId;
        RoyaltyToken royaltyToken = RoyaltyToken(royaltyTokenAddress);
        royaltyToken.mint(to, 100); 
        erc20TokenBalances[tokenId] = 100;

        ipTokenHolders[proposals[proposalId].tokenId] = _to;
        royaltyTokenHolders[proposals[proposalId].tokenId] = _to;
    }


    function quorum() view  internal returns (uint256) {
        uint256 totalSupply = IERC20(votingToken).totalSupply();
        uint256 baseQuorum =  totalSupply / 100; // Set a base quorum value
        return baseQuorum;
    }

    function setVotingPeriod(uint _votingPeriod) public  {
        votingPeriod = _votingPeriod;
    }

    function getIPTokenHolder(uint256 tokenId) public view returns (address) {
    require(tokenId < nextProposalId, "Invalid token ID"); // Implement proper validation
    return ipTokenHolders[tokenId];
    }

    function getRoyaltyTokenHolder(uint256 tokenId) public view returns (address) {
        require(tokenId < nextProposalId, "Invalid token ID"); // Implement proper validation
        return royaltyTokenHolders[tokenId];
    }

    function getTotalVotes(uint256 proposalId) public view returns (uint256) {
        require(proposalId < nextProposalId, "Invalid proposal ID");
        return proposals[proposalId].forVotes;
    }

 
    function getTimeRemaining(uint256 proposalId) public view returns (string memory) { 
        require(proposalId < nextProposalId, "Invalid proposal ID");
        uint256 votingEnd = proposals[proposalId].votingEnd;

        // Check if voting period has ended
        if (block.number > votingEnd) {
            return "Voting Ended";  // Change for clarity 
        } else {
            // Approximate calculation using hardcoded average block time
            uint256 averageBlockTimeInSeconds = 15; // Arbitrum average block time (approximately)
            uint256 remainingBlocks = votingEnd - block.number;

            // Check for time less than one minute
            if (remainingBlocks * averageBlockTimeInSeconds < 60) {
                return "Less than 1 min"; 
            } else {
                uint256 remainingMinutes = remainingBlocks * averageBlockTimeInSeconds / 60;
                return string(abi.encodePacked(remainingMinutes, " mins")); // Convert to string and append 'mins'
            }
        }
    }

    function ping() public pure returns (string memory) {
        return "Pong!";
    }

}
