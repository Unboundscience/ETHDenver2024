import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, Renderer2} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ActionButtonsComponent} from "./features/toolbar/action-buttons/action-buttons.component";
import {Web3Service} from "./core/services/web3.service";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";
import {ViemService} from "./core/services/viem.service";
import {UserAccountService} from "./features/shared/services/user-account.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ActionButtonsComponent
  ],
  providers: [
    Web3Service,
    ViemService,
    UserAccountService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  account: any;

  constructor(public web3Service: Web3Service,
              private viemService: ViemService,
              private userAccountService: UserAccountService,
             @Inject(DOCUMENT) private document: Document,
            private renderer: Renderer2,
  ) {
    this.account = null;
  }

  ngOnInit() {
    this.account = this.web3Service.getAccountOnce();
    this.setDarkTheme();
  }

  setDarkTheme() {
    this.renderer.removeClass(this.document.body, 'menu_light');
    this.renderer.removeClass(this.document.body, 'logo-white');
    this.renderer.addClass(this.document.body, 'menu_dark');
    this.renderer.addClass(this.document.body, 'logo-black');
    const menuOption = 'menu_dark';
    localStorage.setItem('choose_logoheader', 'logo-black');
    localStorage.setItem('menuOption', menuOption);
  }
}
