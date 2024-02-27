import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonpocService {
  readonly BASE_API = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getJsonTest(): Observable<any> {
    return this.http.get(`${this.BASE_API}/json-test`)
  }
}
