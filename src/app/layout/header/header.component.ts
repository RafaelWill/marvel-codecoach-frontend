import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {InitService} from '../../shared/materialize/init.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  username!: string;
  userId!: string;

  constructor(public authenticationService: AuthenticationService,
              private initService: InitService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.getUserId()) {
      this.userId = this.authenticationService.getUserId();
      this.username = this.authenticationService.getUsername();
    }
  }

  ngAfterViewInit(): void {
    this.initService.initDropdowns();
  }
  logout(): void {
    this.authenticationService.logout();
  }
}
