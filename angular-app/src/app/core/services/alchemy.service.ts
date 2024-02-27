import {Injectable} from '@angular/core';
import {Network, Alchemy} from 'alchemy-sdk';
import {environment} from '../../../environments/environment';
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlchemyService {
  readonly ALCHEMY_OP_API_KEY = environment.ALCHEMY_OP_API_KEY;
  settings = {
    apiKey: this.ALCHEMY_OP_API_KEY,
    network: Network.OPT_SEPOLIA,
  };
  alchemy: Alchemy;


  constructor() {
    this.alchemy = new Alchemy(this.settings);
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

  getNftsForOwner() {
    // Get all the NFTs owned by an address
    const nfts = this.alchemy.nft.getNftsForOwner("vitalik.eth");
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

