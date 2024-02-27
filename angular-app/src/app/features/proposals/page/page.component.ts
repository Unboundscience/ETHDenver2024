import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProposalsGridComponent} from "../grid/grid.component";

@Component({
  selector: 'app-proposals-page',
  standalone: true,
  imports: [
    CommonModule,
    ProposalsGridComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class ProposalsPageComponent {

}
