import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {PersonService} from './person.service';
import {Person} from '../model/person';
import {flatMap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _url: string;
  private readonly _tokenKey = 'jwtToken';
  private readonly _fullnameKey = 'fullname';
  private readonly _userId = 'userId';
  private _jwtHelper = new JwtHelperService();
  private currentPerson!: Person;
  private tokenExpirationTimer: any;

  private _isUserLoggedIn = new Subject<boolean>();
  isUserLoggedIn$ = this._isUserLoggedIn.asObservable();

  constructor(private _http: HttpClient,
              private localStorage: LocalStorageService,
              private personService: PersonService,
              private router: Router ) {
    this._url = `${environment.backendUrl}/authenticate`;
  }

  setJwtToken(token: string): void {
    this.localStorage.set(this._tokenKey, token);
  }

  login(loginData: FormData): Observable<any> {
    return this._http.post<any>(this._url, loginData)
      .pipe(
        flatMap(_ => this.personService.findById(this.getUserId()!)),
        tap(person => this.currentPerson = person),
        tap(person => this.localStorage.set(this._userId, `${person.id}`)),
        tap(person => this.localStorage.set(this._fullnameKey, `${person.firstName} ${person.lastName}`)),
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
    this.localStorage.remove(this._fullnameKey);
    this.localStorage.remove(this._userId);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    this._isUserLoggedIn.next(false);
    this.router.navigate([`home`]);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getFullName(): string {
    if (!this.getUserId()) {
      return 'Username unknown';
    }
    return this.localStorage.get(this._fullnameKey)!; // TODO return observable and use it in header
  }

  private decodedToken(): { [key: string]: string } {
    return this._jwtHelper.decodeToken(this.getCurrentToken()!);
  }

  getExpirationDate(): number {
   const expirationDate = +this.decodedToken().exp;
   return new Date(expirationDate * 1000).getTime() - new Date().getTime();
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
