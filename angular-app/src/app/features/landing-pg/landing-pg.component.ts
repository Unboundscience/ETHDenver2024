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
import {ViemService} from "../../core/services/viem.service";

@Component({
    selector: 'app-landing-pg',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        ViemService,
        Web3Service
    ],
    templateUrl: './landing-pg.component.html',
    styleUrl: './landing-pg.component.scss'
})
export class LandingPgComponent {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    duration = 1200;

    readonly NFT_ACCESS_CONTRACT = ''; //environment.NFT_ACCESS_CONTRACT;
    // isConnected: boolean;
    // isConnecting: boolean;
    // isDisconnected: boolean;
    // isReconnecting: boolean;
    // status: string;
    constructor(private web3Service: Web3Service,
                private snackBarService: MatSnackBar,
                private router: Router,
                private veimService: ViemService) {
    }

    async checkNft() {
        try {
            const hasNft = await this.veimService.hasNft();
            console.log(hasNft);
            if (hasNft) {
                this.openSnackBar('Access Verified...');
                this.router.navigate(['/dashboard']);
            } else {
                this.openSnackBar('!!Missing NFT Verification...');
                this.router.navigate(['/sign-up']);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    async login() {
        await this.veimService.init();
        const nextStepLabelMap = {
            'connect-wallet': 'Please connect your wallet -->',
            'check-nft': 'Checking for NFT...',
            'sign-up': 'Let\'s Sign You Up! User would be redirected to sign-up page...'
        };

        if (this.veimService.isConnected()) {
            this.openSnackBar('Checking Your Access...');
            this.checkNft()
        } else {
            this.openSnackBar(nextStepLabelMap['connect-wallet']);
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
