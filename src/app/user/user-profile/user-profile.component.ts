import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private _person!: Person;
  isLoading = true;
  isCoach = false;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.setCookie(personIdFromRoute);
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => { this._person = person;
                             this.isLoading = false;
                             this.assertIfCoach();
                             },
                  error => { console.log(error);
                             this.isLoading = false; });
  }

  get person(): Person {
    return this._person;
  }

  private setCookie(userid: string): void {
    const date = new Date();
    date.setDate(date.getDate() + 3 );
    this.cookieService.set('userid', userid, date, '/', environment.domain);
  }

  assertIfCoach(): void {
    if (this.person.roles.includes('COACH')){
      this.isCoach = true;
    }
  }
}
