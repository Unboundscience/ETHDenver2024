import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Web3Service} from "../../core/services/web3.service";

@Component({
  selector: 'app-landing-pg',
  standalone: true,
  imports: [
      MatIconModule,
      MatButtonModule
  ],
  templateUrl: './landing-pg.component.html',
  styleUrl: './landing-pg.component.scss'
})
export class LandingPgComponent {
    // isConnected: boolean;
    // isConnecting: boolean;
    // isDisconnected: boolean;
    // isReconnecting: boolean;
    // status: string;
    constructor(private web3Service: Web3Service) {}

    login(): void {
        const nextStep = this.getLoginNextStep();
        alert(nextStep);
    }

    isWalletConnected(): boolean {
        const myAcc: any = this.web3Service.getAccountOnce();
        if (myAcc?.isConnected) {
            return true;
        }
        return false;
    }

    getLoginNextStep(): 'check-nft' | 'sign-up' {
        if (this.isWalletConnected()) {
            return 'check-nft';
            //check for nft in the wallet
            //if no nft, go to the scentist / enthusiast
            // lukso form takes nft meta
        } else {
            //navigate to sign up flow
            return 'sign-up';
        }
    }

}
