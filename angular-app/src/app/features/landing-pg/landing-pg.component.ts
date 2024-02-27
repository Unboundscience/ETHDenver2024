import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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

}
