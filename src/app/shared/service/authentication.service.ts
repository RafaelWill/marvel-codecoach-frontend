import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {PersonService} from './person.service';
import {Person} from '../model/person';
import {flatMap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {RoleFeature} from '../model/role-feature.enum';
import {JwtService} from './jwt.service';
import {LocaleStorageKey} from '../model/locale-storage-key.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _url: string;
  private currentPerson!: Person;
  private tokenExpirationTimer: any;

  private _isUserLoggedIn = new Subject<boolean>();
  isUserLoggedIn$ = this._isUserLoggedIn.asObservable();

  constructor(private _http: HttpClient,
              private localStorage: LocalStorageService,
              private personService: PersonService,
              private jwtService: JwtService,
              private router: Router) {
    this._url = `${environment.backendUrl}/authenticate`;
  }

  login(loginData: FormData): Observable<any> {
    return this._http.post<any>(this._url, loginData)
      .pipe(
        flatMap(_ => this.personService.findById(this.getUserId()!)),
        tap(person => this.currentPerson = person),
        tap(person => this.localStorage.set(LocaleStorageKey.userId, `${person.id}`)),
        tap(person => this.localStorage.set(LocaleStorageKey.fullname, `${person.firstName} ${person.lastName}`)),
        tap(_ => this._isUserLoggedIn.next(true))
      );
  }

  getCurrentToken(): string | null {
    return this.localStorage.get(LocaleStorageKey.token);
  }

  isLoggedIn(): boolean {
    return this.localStorage.get(LocaleStorageKey.token) !== null;
  }

  getUserId(): string | null {
    if (this.jwtService.getCurrentToken() === null) {
      return null;
    }
    return this.jwtService.decodedToken().userId;
  }

  getFullName(): string {
    if (!this.getUserId()) {
      return 'Username unknown';
    }
    return this.localStorage.get(LocaleStorageKey.fullname)!;
  }

  logout(): void {
    this.localStorage.remove(LocaleStorageKey.token);
    this.localStorage.remove(LocaleStorageKey.fullname);
    this.localStorage.remove(LocaleStorageKey.userId);

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

  getExpirationDate(): number {
    if (this.jwtService.decodedToken() === null) {
      return 0;
    }
    const expirationDate = +this.jwtService.decodedToken().exp;
    return new Date(expirationDate * 1000).getTime() - new Date().getTime();
  }

  hasFeatureAccess(feature: string): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    return this.jwtService.getFeatures().includes(feature);
  }

  isCoach(): boolean {
    return this.hasFeatureAccess(RoleFeature.findCoaches) && !this.hasFeatureAccess(RoleFeature.becomeCoach);
  }

}


