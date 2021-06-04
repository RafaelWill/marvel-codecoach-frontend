import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {LocaleStorageKey} from '../model/locale-storage-key.enum';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private _jwtHelper = new JwtHelperService();

  constructor(private localStorage: LocalStorageService) { }

  setJwtToken(token: string): void {
    this.localStorage.set(LocaleStorageKey.token, token);
  }

  getCurrentToken(): string | null {
    return this.localStorage.get(LocaleStorageKey.token);
  }

  getFeatures(): Array<string> {
    const features = [];
    for (const i of this.decodedToken().rol) {
      // @ts-ignore
      features.push(i.authority);
    }
    return features;
  }

  decodedToken(): { [key: string]: string } {
    return this._jwtHelper.decodeToken(this.getCurrentToken()!);
  }
}
