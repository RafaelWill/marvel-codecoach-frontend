import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {AuthenticationService} from '../../shared/service/authentication.service';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.css']
})
export class Error401Component implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  }

}
