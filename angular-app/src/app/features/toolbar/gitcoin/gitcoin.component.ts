import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-gitcoin',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './gitcoin.component.html',
  styleUrl: './gitcoin.component.scss'
})
export class GitcoinComponent {
// https://docs.passport.gitcoin.co/building-with-passport/tutorials/gating-access-with-passport-scores

}
