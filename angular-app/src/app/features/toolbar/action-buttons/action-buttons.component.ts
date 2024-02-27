import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {UserAuthService} from "../services/user-auth.service";
import {CommonModule} from "@angular/common";
import {WalletConnectButtonComponent} from "../wallet-connect-button/wallet-connect-button.component";

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    WalletConnectButtonComponent
  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActionButtonsComponent {
  constructor(public userAuthService: UserAuthService) {
  }
}
