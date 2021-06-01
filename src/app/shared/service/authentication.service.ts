import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {PersonService} from './person.service';
import {Person} from '../model/person';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _url: string;
  private readonly _tokenKey = 'jwtToken';
  private _jwtHelper = new JwtHelperService();

  private _isUserLoggedIn = new Subject<boolean>();
  isUserLoggedIn$ = this._isUserLoggedIn.asObservable();

  constructor(private _http: HttpClient,
              private localStorage: LocalStorageService,
              private personService: PersonService) {
    this._url = `${environment.backendUrl}/authenticate`;
  }


  setJwtToken(token: string): void {
    this.localStorage.set(this._tokenKey, token);
  }

  login(loginData: FormData): Observable<any> {
    return this._http.post<any>(this._url, loginData)
      .pipe(
        tap(_ => this._isUserLoggedIn.next(true))
      );
  }

  getCurrentToken(): string | null {
    return this.localStorage.get(this._tokenKey);
  }

  isLoggedIn(): boolean {
    return this.localStorage.get(this._tokenKey) !== null;
  }

  getUserId(): string | null {
    if (this.getCurrentToken() === null) {
      return null;
    }

    return this.decodedToken().userId;
  }

  logout(): void {
    this.localStorage.remove(this._tokenKey);
    this._isUserLoggedIn.next(false);
  }

  getFullName(): string {
    return 'currently fixing it';
    /*
    if (!this.isLoggedIn()) {
      return 'not logged in';
    }

    let firstName: string;
    let lastName: string;
    this.personService.findById(this.getUserId()).pipe(
      tap(user => firstName = user.firstName),
      tap(user => lastName = user.lastName)
    );
    return `${firstName} ${lastName}`;*/
  }

  private decodedToken(): { [key: string]: string } {
    // @ts-ignore
    return this._jwtHelper.decodeToken(this.getCurrentToken());
  }

}

/*
  hasFeatureAccess(feature: string): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    return this.decodedToken().rol.includes(feature);    // TODO adapt roles / features
  }

  getExpiryTime(): number {
    return this.decodedToken ? parseFloat(this.decodedToken().exp) : 0;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }*/
