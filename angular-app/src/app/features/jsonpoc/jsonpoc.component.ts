import {Component, OnInit} from '@angular/core';
import {JsonpocService} from "./services/jsonpoc.service";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-jsonpoc',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    JsonpocService
  ],
  templateUrl: './jsonpoc.component.html',
  styleUrl: './jsonpoc.component.scss'
})
export class JsonpocComponent implements OnInit {
  testOutput: any;
  constructor(public jsonpocService: JsonpocService) {
  }

  ngOnInit() {
    this.jsonpocService.getJsonTest().subscribe((resp) => {
      this.testOutput = resp;
    });
  }
}
