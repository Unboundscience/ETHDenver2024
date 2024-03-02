import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
const donorABI = require('../../../assets/contractData/donor.json');
const scientistABI = require('../../../assets/contractData/scientist.json');
const governorABI = require('../../../assets/contractData/gov.json');
import {getContract, createWalletClient, createPublicClient, http, custom, Address} from 'viem';
import { arbitrumSepolia } from 'viem/chains'

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

  walletAddresses: Array<any>;
  viemClient: any;
  walletClient: any;
  publicClient: any;
  signer: any;
  donorContract: any;
  donorContractWrite: any;
  scientistContract: any;
  scientistContractWrite: any;
  governorContract: any;
  governorContractWrite: any;

  constructor() {
      this.walletAddresses = [];
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

      console.log('donorABI.output.abi ', donorABI.output.abi);

      this.donorContract = getContract({
          address: environment.DONOR_CONTRACT as Address,
          abi: donorABI.output.abi,
          client: { public: this.publicClient, wallet: this.walletClient }
      }) as any;

      this.scientistContract = getContract({
          address: environment.SCIENTIST_NFT_CONTRACT as Address,
          abi: scientistABI.abi,
          client: { public: this.publicClient, wallet: this.walletClient }
      }) as any;


        this.governorContract = getContract({
        address: environment.GOVERNOR_CONTRACT as Address,
        abi: governorABI.output.abi,
        client: { public: this.publicClient, wallet: this.walletClient }
      }) as any;
      return this.getWalletAddresses().then((resp: any) => {
        this.walletAddresses = resp;
  });
  }

  isConnected(): boolean {
    return this.walletAddresses.length > 0;
  }

  hasRequiredNft(address: string, nfts: Array<NftApiDto>): boolean {
    return nfts.some((nft: NftApiDto) => nft?.contract?.address === address);
  }

  mintdonorNFT(amount: number): Promise<any> {
    return this.donorContract.write.mint([amount], {
        account: this.walletAddresses[0]
    });
}

  mintScientistNFT(): Promise<any> {
      return this.scientistContract.write.mint([], {
          account: this.walletAddresses[0]
      });
  }

  async hasNft(): Promise<boolean> {
      const balance = await this.scientistContract.read.balanceOf([this.walletAddresses[0]]);
      console.log(balance);
      return balance > 0n;
  }

  async getWalletAddresses() {
      return await this.walletClient.requestAddresses();
  }

  async getDonorTotalSupply() {
        return await this.donorContract.read.totalSupply();
  }

  async submitProposal(title: string, description: string, tokenId: number): Promise<any> {
      return this.governorContract.write.propose([title, description, tokenId], { 
          account: this.walletAddresses[0]})
      }
}

