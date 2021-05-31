import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(loginData: FormData): Observable<any> {
    alert('not implemented');
    return new Observable<any>();
  }

  logout(): void {
    alert('not implemented');
  }

  isLoggedIn(): boolean {
    return false;
  }

  getUserId(): string {
    return 'not implemented';
  }

  getUsername(): string {
    return 'not implemented';
  }
}
