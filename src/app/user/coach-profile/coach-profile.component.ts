import { Component, OnInit } from '@angular/core';
import {Person} from '../../shared/model/person';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../shared/service/person.service';
import {CoachingTopic} from '../../shared/model/coaching-topic';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})
export class CoachProfileComponent implements OnInit {
  private _coach!: Person;
  private _topics: Array<CoachingTopic> = [];
  private _idToGet = '';
  isLoading = false;

  constructor(private route: ActivatedRoute, private personService: PersonService) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('coachId'));
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => { this._coach = person;
                             this._topics = person.coachingTopics;
                             this._idToGet = personIdFromRoute;
                             this.isLoading = false;
        },
        error => { console.log(error);
                   this.isLoading = false;
      });
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
