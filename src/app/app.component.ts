import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './shared/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'marvel-codecoach-frontend';


  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    const expirationDate = this.authenticationService.getExpirationDate();
    if (expirationDate !== 0){ console.log('session expiration:' + expirationDate); }
    this.authenticationService.autoLogout(expirationDate);
  }
}
