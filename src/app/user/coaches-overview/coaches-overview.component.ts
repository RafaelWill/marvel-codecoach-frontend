import {Component, OnInit} from '@angular/core';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {CoachingTopic} from '../../shared/model/coaching-topic';
import {InitService} from '../../shared/materialize/init.service';
import {CoachfilterPipe} from '../../shared/pipe/coachfilter.pipe';

@Component({
  selector: 'app-coaches-overview',
  templateUrl: './coaches-overview.component.html',
  styleUrls: ['./coaches-overview.component.css']
})
export class CoachesOverviewComponent implements OnInit {

  private _coaches: Array<Person> = [];
  private _coachesDisplay: Array<Person> = [];
  private _topics: Array<string> = [];
  isLoading!: boolean;
  userId!: string | null;
  searchText = '';
  private _tempitem: Array<string> = [];
  private _person!: Person;


  constructor(private personService: PersonService,
              private authenticationService: AuthenticationService,
              private initService: InitService,
              private coachFilter: CoachfilterPipe) {
  }

  ngOnInit(): void {
    this.getCoaches();
    this.getPerson();
  }

  private getCoaches(): void {
    this.isLoading = true;
    this.personService.getAllCoaches().subscribe(allCoaches => {
        const allCoachesButUser = allCoaches.filter(coach => coach.id !== this.authenticationService.getUserId());
        this._coaches = allCoachesButUser;
        this._coachesDisplay = allCoachesButUser;
        this.isLoading = false;
        this.makeTopicSearchList();
        this.initService.initFormSelect();
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  private makeTopicSearchList(): void {
    const temp: Array<CoachingTopic> = [];
    this._coaches.forEach(coach => coach.coachingTopics.forEach(coachingTopic => temp.push(coachingTopic)));
    this._topics = Array.from(new Set(temp.map(coachingTopic => coachingTopic.topic.toLowerCase())));
  }

  get coaches(): Array<Person> {
    return this._coachesDisplay;
  }

  get coachTopics(): Array<string> {
    return this._topics;
  }

  get person(): Person {
    return this._person;
  }

  onItemSelect(item: string[]): void {
    this._coachesDisplay = [];
    this._tempitem = item;
    this._coachesDisplay = this.coachFilter.transform(this._coaches, this.searchText, this._tempitem);
  }

  onTextChange(): void {
    this._coachesDisplay = [];
    this._coachesDisplay = this.coachFilter.transform(this._coaches, this.searchText, this._tempitem);
  }

  private getPerson(): void {
    this.personService
      .findById(this.authenticationService.getUserId()!)
      .subscribe(person => { this._person = person;
        },
        error => { console.log(error);
      });
  }

}
