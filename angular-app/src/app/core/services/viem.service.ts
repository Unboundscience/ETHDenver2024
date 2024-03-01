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
  donorContract: any;
    blockNumber: any;

  constructor() {

  }
  // getLatestBlock(): Observable<any> {
  //   return from(this.alchemy.core.getBlockNumber());
  // }

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

  async testPing() {
      const publicClient = createPublicClient({
            chain: arbitrumSepolia,
            transport: http(environment.ALCHEMY_ARBTRUM_URL)
        });

      // WORKS
      // const walletClient = createWalletClient({
      //     chain: arbitrumSepolia,
      //     transport: custom(window.ethereum as any)
      // });

      // const [address] = await this.walletClient.getAddresses();
      //   console.log('Wallet address: ', address);

      const contract = getContract({
            address: environment.DONOR_CONTRACT as Address,
            abi: donorABI.output.abi,
          publicClient: publicClient
          // @ts-ignore
          //   client: { public: publicClient, wallet: walletClient}
        }) as any;
        const result = await contract.read.totalSupply();
        console.log('Total supply: ', result);
  }

    submitProposal(): Observable<any> {
        return new Observable<any>((observer) => {
            observer.next('Proposal Submitted');
            observer.complete();
        });
    }

}

