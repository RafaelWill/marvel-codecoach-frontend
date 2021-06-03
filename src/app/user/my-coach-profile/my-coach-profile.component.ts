import { Component, OnInit } from '@angular/core';
import {Person} from '../../shared/model/person';
import {CoachingTopic} from '../../shared/model/coaching-topic';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../shared/service/person.service';
import {LocalStorageService} from '../../shared/service/local-storage.service';

@Component({
  selector: 'app-my-coach-profile',
  templateUrl: './my-coach-profile.component.html',
  styleUrls: ['./my-coach-profile.component.css']
})
export class MyCoachProfileComponent implements OnInit {

  private _coach!: Person;
  private _topics: Array<CoachingTopic> = [];
  private _idToGet = '';
  userId!: string | null;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private personService: PersonService,
              private localStorage: LocalStorageService) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.userId = this.localStorage.get('userId');
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => { this._coach = person;
                             this._topics = person.coachingTopics;
                             this._idToGet = personIdFromRoute;
                             this.isLoading = false;
        },
        error => { console.log(error);
                   this.isLoading = false; });
  }

  get coach(): Person{
    return this._coach;
  }

  get topics(): Array<CoachingTopic>{
    return this._topics;
  }

  get idToGet(): string{
    return this._idToGet;
  }
}
