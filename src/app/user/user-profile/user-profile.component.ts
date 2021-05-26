import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private _person!: Person;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => this._person = person);
  }

  get person(): Person {
    return this._person;
  }
}
