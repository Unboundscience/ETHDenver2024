import { Component } from '@angular/core';
import {ProposalsRowComponent} from "../row/row.component";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-proposals-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProposalsRowComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class ProposalsGridComponent {
  $proposals: Observable<any>;

  constructor() {
    this.$proposals = new Observable<any>();
  }
}
