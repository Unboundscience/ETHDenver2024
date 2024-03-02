const { Client } = require("@xmtp/client"); // Assuming Node.js environment

const WEBHOOK_URL = "YOUR_WEBHOOK_URL";
const CONVERSE_GROUP_LINK_ENDPOINT = "https://backend-staging.converse.xyz/api/groups/create";

// Function for generating unique groups with a seed
function createUniqueGroups(wallets, seed) {
  // Implement your logic for generating unique groups with remainders handling (provided earlier)
}

async function createConverseGroups(walletAddresses, seed) {
  try {
    // Pre-generate unique groups locally
    const uniqueGroups = createUniqueGroups(walletAddresses, seed);

    // Create groups, store information in an array
    const groupInfoList = [];
    for (const group of uniqueGroups) {
      const groupName = `Group ${uniqueGroups.indexOf(group) + 1}`; // Basic naming
      const groupDescription = "Pre-generated group";

      try {
        const groupLinkData = await createConverseGroup(groupName, groupDescription);

        // Create an object for each group with members and link
        const groupInfo = {
          members: group,
          link: groupLinkData.link,
        };

        groupInfoList.push(groupInfo);
      } catch (error) {
        console.error(`Failed to create group link for group: ${group}`, error);
      }
    }

    return groupInfoList;
  } catch (error) {
    console.error("Error during group creation process:", error);
    // Handle overall errors
  }
}

// Example usage
const walletAddresses = ["wallet1", "wallet2", ...]; // Your wallet addresses
const seed = Math.random(); // Or provide a specific seed
const groupInfoList = createConverseGroups(walletAddresses, seed);

if (groupInfoList && groupInfoList.length > 0) {
  console.table(groupInfoList, ["members", "link"]); // Print table using console.table
} else {
  console.log("No groups were created.");