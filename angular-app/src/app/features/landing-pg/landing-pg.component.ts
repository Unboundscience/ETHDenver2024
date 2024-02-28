import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Web3Service} from "../../core/services/web3.service";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

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
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    duration = 1200;

    // isConnected: boolean;
    // isConnecting: boolean;
    // isDisconnected: boolean;
    // isReconnecting: boolean;
    // status: string;
    constructor(private web3Service: Web3Service,
                private snackBarService: MatSnackBar,
                private router: Router) {}

    login(): void {
        const nextStep = this.getLoginNextStep();
        const nextStepLabelMap = {
            'connect-wallet': 'Please connect your wallet -->',
            'check-nft': 'Checking for NFT...',
            'sign-up': 'Let\'s Sign You Up!'
        };
        this.openSnackBar(nextStepLabelMap[nextStep]);
        if (nextStep === 'sign-up'){
            this.router.navigate(['/sign-up']);
        }
    }

    isWalletConnected(): boolean {
        const myAcc: any = this.web3Service.getAccountOnce();
        if (myAcc?.isConnected) {
            return true;
        }
        return false;
    }

    getLoginNextStep(): 'connect-wallet' | 'check-nft' | 'sign-up' {
        if (this.isWalletConnected()) {
            return 'sign-up';
            //check for nft in the wallet
            //if no nft, go to the scentist / enthusiast
            // lukso form takes nft meta
        } else {
            //navigate to sign up flow
            return 'connect-wallet';
        }
    }

    openSnackBar(msg: string) {
        this.snackBarService.open(msg, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.duration
        });
    }

}
