import {Component, OnInit} from '@angular/core';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-coaches-overview',
  templateUrl: './coaches-overview.component.html',
  styleUrls: ['./coaches-overview.component.css']
})
export class CoachesOverviewComponent implements OnInit {
  private _coaches: Array<Person> = [];
  isLoading = true;
  hasCookie = false;
  cookieValue = '';

  constructor(private service: PersonService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.getCoaches();
    const cookieValue = this.cookieService.get('userid');
    if (cookieValue !== '') {
      this.hasCookie = true;
      this.cookieValue = cookieValue;
    }
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
