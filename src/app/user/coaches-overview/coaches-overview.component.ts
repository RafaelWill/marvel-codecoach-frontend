import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {CoachingTopic} from '../../shared/model/coaching-topic';
import {InitService} from '../../shared/materialize/init.service';
import {ActivatedRoute} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-coaches-overview',
  templateUrl: './coaches-overview.component.html',
  styleUrls: ['./coaches-overview.component.css']
})
export class CoachesOverviewComponent implements OnInit {

  private _coaches: Array<Person> = [];

  private _coachesDisplay: Array<Person> = [];
  private _topics: Array<string> = [];
  isLoading = true;
  userId!: string | null;
  searchText = '';
  private readonly minLengtTosearch = 3;
  private _tempitem: Array<string> = [];
  private _person!: Person;

  private static searchContainsText(coach: Person, text: string): boolean {
    return coach.firstName.toLowerCase().includes(text) || coach.lastName.toLowerCase().includes(text) || coach.email.toLowerCase().includes(text) || coach.firstName.concat(' ', coach.lastName).toLowerCase().includes(text);
  }

  constructor(private personService: PersonService,
              private authenticationService: AuthenticationService,
              private initService: InitService) {
  }

  ngOnInit(): void {
    this.getCoaches();
    this.getPerson();
  }

    private getCoaches(): void {
    this.personService.getAllCoaches().subscribe(allCoaches => {
        const allCoachesButUser = allCoaches.filter(coach => coach.id !== this.authenticationService.getUserId());
        this._coaches = allCoachesButUser;
        this._coachesDisplay = allCoachesButUser;
        this.makeTopicSearchList();
        this.initService.initFormSelect();
      },
      error => {
        console.log(error);
      });
    this.isLoading = false;
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

    this.filterCoaches();
  }

  onTextChange(): void {
    this._coachesDisplay = [];
    this.filterCoaches();
  }

  private filterCoaches(): void {
    if (this._tempitem.length === 0 && this.searchText.length <= 2) {
      this._coachesDisplay = this._coaches;
    } else if (this._tempitem.length === 0 && this.searchText.length > 2) {
      this._coaches.forEach(coach => {
        if (CoachesOverviewComponent.searchContainsText(coach, this.searchText.toLowerCase())) {
          this._coachesDisplay.push(coach);
        }
      });
    } else if (this._tempitem.length >= 1) {
      this._coaches.forEach(coach => {
        const filteredTopic = coach.coachingTopics.filter(x => this._tempitem.some(y => x.topic.toLowerCase() === y));
        if (filteredTopic.length > 0) {
          if (this.searchText.length >= this.minLengtTosearch) {
            if (CoachesOverviewComponent.searchContainsText(coach, this.searchText.toLowerCase())) {
              this._coachesDisplay.push(coach);
            }
          } else {
            this._coachesDisplay.push(coach);
          }
        }
      });
    }
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
