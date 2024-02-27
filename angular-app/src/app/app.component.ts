import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {GitcoinComponent} from "./features/toolbar/gitcoin/gitcoin.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ActionButtonsComponent} from "./features/toolbar/action-buttons/action-buttons.component";
import {Web3Service} from "./core/services/web3.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    GitcoinComponent,
  ActionButtonsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'angular-app';
  constructor(private web3Service: Web3Service) {
  }
}
