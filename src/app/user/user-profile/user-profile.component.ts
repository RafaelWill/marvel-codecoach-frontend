import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {LocalStorageService} from '../../shared/service/local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private _person!: Person;
  isLoading = true;
  isCoach = false;
  userId!: string | null;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.userId = this.localStorage.get('userId');
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

  assertIfCoach(): void {
    if (this.person.roles.includes('COACH')){
      this.isCoach = true;
    }
  }
}
