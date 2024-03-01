import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {from, Observable} from "rxjs";
const donorABI = require('../../../assets/contractData/donor.json');
import {getContract, createWalletClient, createPublicClient, http, custom, Address} from 'viem';
import { arbitrumSepolia } from 'viem/chains'
import {EthereumClient} from "@web3modal/ethereum";

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
export class ViemService {
  readonly ALCHEMY_OP_API_KEY = environment.ALCHEMY_OP_API_KEY;
  readonly ALCHEMY_ARBITRUM_API_KEY = environment.ALCHEMY_ARBITRUM_API_KEY;
  readonly ALCHEMY_ARBTRUM_URL = environment.ALCHEMY_ARBTRUM_URL;

  viemClient: any;
  walletClient: any;
  publicClient: any;
  signer: any;
  donorContractRead: any;
    donorContractWrite: any;
    blockNumber: any;

  constructor() {
  }

  async init() {
      this.walletClient = createWalletClient({
          chain: arbitrumSepolia,
          transport: custom(window.ethereum as any)
      });
      this.publicClient = createPublicClient({
          chain: arbitrumSepolia,
          transport: http(environment.ALCHEMY_ARBTRUM_URL)
      });
      this.donorContractRead = getContract({
          address: environment.DONOR_CONTRACT as Address,
          abi: donorABI.output.abi,
          publicClient: this.publicClient
      }) as any;
      this.donorContractWrite = getContract({
          address: environment.DONOR_CONTRACT as Address,
          abi: donorABI.output.abi,
          walletClient: this.walletClient
      }) as any;
  }

  getNftsForOwner(ownerAddress: string){
  //   // Get all the NFTs owned by an address
  //   return this.alchemy.nft.getNftsForOwner(ownerAddress).then( (nfts) => {
  //     return nfts;
  //   });
   }

  hasRequiredNft(address: string, nfts: Array<NftApiDto>): boolean {
    return nfts.some((nft: NftApiDto) => nft?.contract?.address === address);
  }

  mintNFT(toAddress: string, amount: number): void {
  }

  async getDonorTotalSupply() {
        return await this.donorContractRead.read.totalSupply();
  }

    submitProposal(): Observable<any> {
        return new Observable<any>((observer) => {
            observer.next('Proposal Submitted');
            observer.complete();
        });
    }

}

