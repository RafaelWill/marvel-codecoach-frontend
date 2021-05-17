import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Person} from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = `${environment.backendUrl}/users`;
  }

  save(personData: FormData): Observable<Person>{
    return this._http.post<Person>(this._url, personData);
  }
}
