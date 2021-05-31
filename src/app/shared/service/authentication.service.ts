import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _url: string;
  private readonly _tokenKey = 'jwtToken';
  private _jwtHelper = new JwtHelperService();
  // TODO: userLoggedIn$

  constructor(private _http: HttpClient) {
    this._url = `${environment.backendUrl}/authenticate`;
  }

  login(loginData: FormData): Observable<any> {
    return this._http.post<any>(this._url, loginData)
      .pipe(
        map(response => {
          const token = (response as any).Token;
          sessionStorage.setItem(this._tokenKey, token);
        })
      );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this._tokenKey) !== null;
  }

  getCurrentTokenValue(): string | null {
    return sessionStorage.getItem(this._tokenKey);
  }

  getUserId(): string | null {
    if (this.getCurrentTokenValue() === null) {
      return null;
    }
    // @ts-ignore
    return this._jwtHelper.decodeToken(this.getCurrentTokenValue()).userId;
  }

  logout(): void {
    sessionStorage.removeItem(this._tokenKey);
  }

  getUsername(): string {
    return 'not implemented';
  }



}

