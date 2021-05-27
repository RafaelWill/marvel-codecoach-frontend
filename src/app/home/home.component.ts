import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InitService} from '../shared/materialize/init.service';
import {PersonService} from '../shared/service/person.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  hasCookie = false;
  cookieValue = '';
  constructor(private _initService: InitService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('userid');
    if (cookieValue !== '') {
      this.hasCookie = true;
      this.cookieValue = cookieValue;
    }
  }

  ngAfterViewInit(): void {
    this._initService.initParalax();
    this._initService.initSidenav();
  }
}
