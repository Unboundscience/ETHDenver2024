import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Web3Service} from "../../../core/services/web3.service";

@Component({
  selector: 'wallet-connect-button',
  standalone: true,
  imports: [],
  templateUrl: './wallet-connect-button.component.html',
  styleUrl: './wallet-connect-button.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WalletConnectButtonComponent {

  constructor(private web3Service: Web3Service) {}
}
