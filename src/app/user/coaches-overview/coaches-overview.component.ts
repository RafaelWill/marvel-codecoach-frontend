import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {CoachingTopic} from '../../shared/model/coaching-topic';
import {InitService} from '../../shared/materialize/init.service';
import {ActivatedRoute} from '@angular/router';
import {CoachfilterPipe} from '../../shared/pipe/coachfilter.pipe';

@Component({
  selector: 'app-coaches-overview',
  templateUrl: './coaches-overview.component.html',
  styleUrls: ['./coaches-overview.component.css']
})
export class CoachesOverviewComponent implements OnInit, AfterViewInit {

  private _coaches: Array<Person> = [];

  private _coachesDisplay: Array<Person> = [];
  private _topics: Array<string> = [];
  isLoading = true;
  userId!: string | null;
  searchText = '';
  private minLengtTosearch = 3;
  private _tempitem: Array<string> = [];
  isCoach = false;
  private _person!: Person;

  constructor(private service: PersonService,
              private authenticationService: AuthenticationService,
              private initService: InitService,
              private route: ActivatedRoute,
              private coachFilter: CoachfilterPipe) {
  }

  ngOnInit(): void {
    this.getCoaches();
    this.getPerson();
  }

  ngAfterViewInit(): void {
    this.initService.initFormSelect();
  }

  private getCoaches(): void {
    this.service.getAllCoaches().subscribe(x => {
        this._coaches = x;
        this._coachesDisplay = x;
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
    this._coaches.forEach(x => x.coachingTopics.forEach(y => temp.push(y)));
    this._topics = Array.from(new Set(temp.map(x => x.topic.toLowerCase())));
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
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.service
      .findById(personIdFromRoute)
      .subscribe(person => { this._person = person;
                             this.assertIfCoach();
        },
        error => { console.log(error);
      });
  }

  assertIfCoach(): void {
    if (this.person.roles.includes('COACH')){
      this.isCoach = true;
    }
  }
}
