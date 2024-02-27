import { Injectable } from '@angular/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi1'
import { arbitrum, mainnet, hardhat} from "@wagmi/core/chains";
import {Web3Modal} from "@web3modal/html";
import {Web3ModalOptions} from "@web3modal/wagmi1/dist/types/src/client";
import { environment } from '../../../environments/environment';

const projectId = environment.WAGMI_PROJ_ID;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  chains = [mainnet, arbitrum];
  web3modal: Web3Modal | any;

  constructor() {
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

    const wagmiConfig = defaultWagmiConfig({ chains: this.chains, projectId, metadata });

    const modalOptions:Web3ModalOptions =  { wagmiConfig, projectId, chains: this.chains };
    this.web3modal = createWeb3Modal(modalOptions);

  }

}
