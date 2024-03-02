import { Injectable } from '@angular/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi1'
import { arbitrum, mainnet, hardhat} from "@wagmi/core/chains";
import {Web3Modal} from "@web3modal/html";
import {Web3ModalOptions} from "@web3modal/wagmi1/dist/types/src/client";
import { environment } from '../../../environments/environment';
import {BehaviorSubject, Observable, of} from "rxjs";
import {getAccount, GetAccountResult} from '@wagmi/core';
import {isEqual} from "lodash-es";
import {PublicClient} from "viem";

export type WalletAccountDto = {
  address: string;
  connector: any;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  isReconnecting: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  chains = [mainnet, arbitrum];
  web3modal: Web3Modal | any;
  account$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  readonly WAGMI_PROJ_ID;

  constructor() {
    this.WAGMI_PROJ_ID = environment.WAGMI_PROJ_ID;
    this.init();
  }

  init() {
    // 2. Create wagmiConfig
    const metadata = {
      name: 'Web3Modal',
      description: 'Web3Modal Example',
      url: 'https://web3modal.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
    //
    // const wagmiConfig = {};// defaultWagmiConfig({ chains: this.chains, projectId: this.WAGMI_PROJ_ID, metadata });
    //
    // const modalOptions:Web3ModalOptions =  { wagmiConfig, projectId: this.WAGMI_PROJ_ID, chains: this.chains };
    // this.web3modal = createWeb3Modal(modalOptions);
    //
    // let accountCache: WalletAccountDto = {
    //   address: '',
    //   connector: null,
    //   isConnected: false,
    //   isConnecting: false,
    //   isDisconnected: false,
    //   isReconnecting: false,
    //   status: ''
    // };
    // this.web3modal.subscribeState((newState: any) => {
    //   const upd = this.getAccountOnce();
    //   if (isEqual(upd, accountCache)) {
    //     this.account$.next(upd);
    //   }
    //   accountCache = upd as WalletAccountDto;
    // });
  }

  getAccountOnce(): any {
    // return getAccount();
  }
}
