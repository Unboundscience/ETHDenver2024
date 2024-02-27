import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {GitcoinComponent} from "./features/toolbar/gitcoin/gitcoin.component";
import {ActionButtonsComponent} from "./features/toolbar/action-buttons/action-buttons.component";
import {Web3Service} from "./core/services/web3.service";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";
import {AlchemyService} from "./core/services/alchemy.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    RouterOutlet,
    GitcoinComponent,
  ActionButtonsComponent],
  providers: [
    Web3Service,
    AlchemyService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  latestBlock$: Observable<any>;
  account: any;

  constructor(public web3Service: Web3Service, private alchemyService: AlchemyService) {
    this.latestBlock$ = this.alchemyService.getLatestBlock();
    this.account = null;
  }

  ngOnInit() {
    this.latestBlock$.subscribe((latest) => console.log(latest));
    this.account = this.web3Service.getAccountOnce();
  }
}
