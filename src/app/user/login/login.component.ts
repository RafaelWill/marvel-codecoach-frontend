import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {InitService} from '../../shared/materialize/init.service';
import {AuthenticationService} from '../../shared/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error!: boolean;
  success!: boolean;
  sending!: boolean;
  wrongUsernameOrPassword!: boolean;
  userUnknown!: boolean;
  loginForm;
  title = 'Sign in';

  private redirectUrl!: string;
  private fragment!: string;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private initService: InitService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    document.title = this.title;
    this.route.queryParams.subscribe(queryParams => this.redirectUrl = queryParams.redirectUrl);
    this.route.fragment.subscribe(fragment => this.fragment = fragment);
  }

  submit(loginData: FormData): void {
    this.sending = true;
    this.error = false;
    this.success = false;
    this.authenticationService.login(loginData)
      .subscribe(
        ( () => {
          this.success = true;
          this.initService.initDropdowns();
          this.router.navigateByUrl('/home');
        }),
        (fault => {
          console.log('login failed');
          this.sending = false;
          if (fault.status === 401) {
            this.wrongUsernameOrPassword = true;
          } else {
            this.error = true;
          }
        })
      );
    this.loginForm.reset();
  }

  logout(): void{
    this.authenticationService.logout();
  }

}
