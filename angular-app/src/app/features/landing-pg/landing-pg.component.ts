import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Web3Service} from "../../core/services/web3.service";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {AlchemyService, NftApiDto} from "../../core/services/alchemy.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-landing-pg',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        AlchemyService,
        Web3Service
    ],
    templateUrl: './landing-pg.component.html',
    styleUrl: './landing-pg.component.scss'
})
export class LandingPgComponent {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    duration = 1200;

    readonly NFT_ACCESS_CONTRACT = '0x2f98ed540467ffAb3841Aa8B0bBe175bA85DbdF9';
    // isConnected: boolean;
    // isConnecting: boolean;
    // isDisconnected: boolean;
    // isReconnecting: boolean;
    // status: string;
    constructor(private web3Service: Web3Service,
                private snackBarService: MatSnackBar,
                private router: Router,
                private alchemyService: AlchemyService) {
    }

    login(): void {

        const nextStepLabelMap = {
            'connect-wallet': 'Please connect your wallet -->',
            'check-nft': 'Checking for NFT...',
            'sign-up': 'Let\'s Sign You Up!'
        };

        if (this.isWalletConnected()) {
            const walletOwnerAddres = this.web3Service.getAccountOnce();
            //check for nft in the wallet
            this.alchemyService.getNftsForOwner(walletOwnerAddres?.address).then((nfts) => {
                this.openSnackBar('Checking Your Access...');
                setTimeout(() => {
                    // if they have the nft go to the dashboard
                    if (this.hasRequiredNft(nfts)) {
                        this.openSnackBar('Access Verified...');
                        setTimeout(() => {
                            this.router.navigate(['/dashboard']);
                        }, 750);
                        // if not, send them to create a profile and mint an nft
                    } else {
                        this.openSnackBar(nextStepLabelMap['sign-up']);
                        this.router.navigate(['/sign-up']);
                    }
                }, 1000);
            });
        } else {
            this.openSnackBar(nextStepLabelMap['connect-wallet']);
        }
    }

    isWalletConnected(): boolean {
        const myAcc: any = this.web3Service.getAccountOnce();
        if (myAcc?.isConnected) {
            return true;
        }
        return false;
    }

    hasRequiredNft(nfts: { ownedNfts: Array<NftApiDto> | undefined }): boolean {
        if (nfts.ownedNfts !== undefined && Array.isArray(nfts.ownedNfts) && nfts.ownedNfts.length > 0) {
            return this.alchemyService.hasRequiredNft(this.NFT_ACCESS_CONTRACT, nfts.ownedNfts);
        }
        return false;
    }

    openSnackBar(msg: string) {
        this.snackBarService.open(msg, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.duration
        });
    }

}
