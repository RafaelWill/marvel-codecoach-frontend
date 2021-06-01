import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map, tap} from 'rxjs/operators';
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

  login(loginData: FormData): Observable<any> {
    return this._http.post<any>(this._url, loginData)
      .pipe(
        map(response => {
          const token = (response as any).Token;
          this.localStorage.set(this._tokenKey, token);
        }),
        tap( () => this._isUserLoggedIn.next(true))
      );
  }

  isLoggedIn(): boolean {
    return this.localStorage.get(this._tokenKey) !== null;
  }

  getCurrentTokenValue(): string | null {
    return this.localStorage.get(this._tokenKey);
  }

  getUserId(): string | null {
    if (this.getCurrentTokenValue() === null) {
      return null;
    }
    // @ts-ignore
    return this._jwtHelper.decodeToken(this.getCurrentTokenValue()).userId;
  }

  logout(): void {
    this.localStorage.remove(this._tokenKey);
    this._isUserLoggedIn.next(false);
  }

  getFullName(): string {
    let person: Person;

    if (this.getUserId() !== null){
    // @ts-ignore
    this.personService.findById(this.getUserId()).subscribe( user => person = user);
    // @ts-ignore
    return `${person.firstName} ${person.lastName}`;
    }

    return 'not logged in';
  }

}

