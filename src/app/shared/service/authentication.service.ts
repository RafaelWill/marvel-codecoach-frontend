import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(loginData: FormData): Observable<any> {
    throw new Error('not implemented');
    return new Observable<any>();
  }

  logout(): void {
    throw new Error('not implemented');
  }
}
