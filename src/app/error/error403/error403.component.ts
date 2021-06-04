import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css']
})
export class Error403Component implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  get isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  }
}
