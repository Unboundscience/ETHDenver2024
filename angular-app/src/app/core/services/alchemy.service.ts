import {Injectable} from '@angular/core';
import {Network, Alchemy} from 'alchemy-sdk';
import {environment} from '../../../environments/environment';
import {from, Observable} from "rxjs";
import {some} from "lodash-es";
const ethers = require('ethers');

export type ContractMetaDto = {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: string;
  openSeaMetadata: any;
  spamClassifications: Array<any>;
}

export type NftApiDto =
  {
    contract: ContractMetaDto;
    tokenId: string;
    tokenType: string;
    image: any;
    raw: {
      metadata: any;
      error: string
    };
    mint: any;
    timeLastUpdated: string;
    balance: string;
    acquiredAt: {}
  };

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {
  readonly ALCHEMY_OP_API_KEY = environment.ALCHEMY_OP_API_KEY;
  readonly ALCHEMY_ARBITRUM_API_KEY = environment.ALCHEMY_ARBITRUM_API_KEY;
  OptimismSettings = {
    apiKey: this.ALCHEMY_OP_API_KEY,
    network: Network.OPT_SEPOLIA,
  };
  ArbitrumSettings = {
      apiKey: this.ALCHEMY_ARBITRUM_API_KEY,
      network: Network.ARB_SEPOLIA
  }
  alchemy: Alchemy;


  constructor() {
    this.alchemy = new Alchemy(this.OptimismSettings);
  }

  getLatestBlock(): Observable<any> {
    return from(this.alchemy.core.getBlockNumber());
  }

  getOutboundTransfers() {
    // Get all outbound transfers for a provided address
    this.alchemy.core
      .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
      .then(console.log);
  }

  getNftsForOwner(ownerAddress: string): Promise<any> {
    // Get all the NFTs owned by an address
    return this.alchemy.nft.getNftsForOwner(ownerAddress).then( (nfts) => {
      return nfts;
    });
  }

  hasRequiredNft(address: string, nfts: Array<NftApiDto>): boolean {
    return nfts.some((nft: NftApiDto) => nft?.contract?.address === address);
  }

  mintNFT(toAddress: string, amount: number): void {
  // Define an Alchemy Provider
    const provider = new ethers.AlchemyProvider('sepolia', environment.ALCHEMY_ARBITRUM_API_KEY)

    // Get contract ABI file
//    const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// // Create a signer
//   const privateKey = process.env.PRIVATE_KEY
//   const signer = new ethers.Wallet(privateKey, provider)

// // Get contract ABI and address
//   const abi = contract.abi
//   const contractAddress = '0xA4766Ceb9E84a71D282A4CED9fB8Fe93C49b2Ff7'

// // Create a contract instance
//   const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// // Get the NFT Metadata IPFS URL
//   const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

// // Call mintNFT function
//   const mintNFT = async () => {
//     let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
//     await nftTxn.wait()
//     console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
//   }
//
//   mintNFT()
// .then(() => process.exit(0))
// .catch((error) => {
//   console.error(error);
//   process.exit(1);
// });
  }

  watchPendingTransactions() {
    // Listen to all new pending transactions
    // this.alchemy.ws.on(
    //   {
    //     method: "alchemy_pendingTransactions",
    //     fromAddress: "vitalik.eth"
    //   },
    //   (res) => console.log(res)
    // );
  }


}

