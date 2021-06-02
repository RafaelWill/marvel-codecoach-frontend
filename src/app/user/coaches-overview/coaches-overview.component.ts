import {Component, OnInit} from '@angular/core';
import {Person} from '../../shared/model/person';
import {PersonService} from '../../shared/service/person.service';
import {AuthenticationService} from '../../shared/service/authentication.service';

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
  userId!: string | null;

  constructor(private service: PersonService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getCoaches();
    this.userId = this.authenticationService.getUserId();
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
