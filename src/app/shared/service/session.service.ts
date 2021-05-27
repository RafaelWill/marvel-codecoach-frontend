import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _url: string;

  constructor(private _http: HttpClient) {
    this._url = `${environment.backendUrl}/sessions`;
  }

  save(sessionData: FormData): Observable<any> {
    return this._http.post<any>(`${this._url}`, sessionData);
  }
}
