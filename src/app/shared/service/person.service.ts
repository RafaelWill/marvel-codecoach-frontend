import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Person} from '../model/person';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly _url: string;

  private _hasBecomeCoach = new Subject<boolean>();
  hasBecomeCoach$ = this._hasBecomeCoach.asObservable();

  constructor(private _http: HttpClient) {
    this._url = `${environment.backendUrl}/users`;
  }

  save(personData: FormData): Observable<Person>{
    return this._http.post<Person>(this._url, personData);
  }

  findById(id: string): Observable<Person> {
    return this._http.get<Person>(`${this._url}/${id}`);
  }

  getAllCoaches(): Observable<Array<Person>>{
    return this._http.get<Array<Person>>(`${this._url}/coaches`);
  }

  becomeCoach(id: string, coachData: FormData): Observable<any> {
    return this._http.post(`${this._url}/${id}/become-coach`, coachData);
  }

  hasBecomeCoach(): void{
    this._hasBecomeCoach.next(true);
  }
}
