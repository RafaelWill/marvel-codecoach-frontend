import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {CoachingTopic} from '../../shared/model/coaching-topic';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-coaches-overview',
  templateUrl: './coaches-overview.component.html',
  styleUrls: ['./coaches-overview.component.css']
})
export class CoachesOverviewComponent implements OnInit {
  private _coaches: Array<Person> = [];
  isLoading = true;


  constructor(private service: PersonService) {
  }

  ngOnInit(): void {
    this.getCoaches();
  }

  private getCoaches(): void {
    this.service.getAllCoaches().subscribe(x => {
        this._coaches = x;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  get coaches(): Array<Person> {
    return this._coaches;
  }
}
