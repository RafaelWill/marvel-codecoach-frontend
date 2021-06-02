import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
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
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {
        validators:
          [Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
      }]
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
        ( res => {
          this.success = true;
          this.initService.initDropdowns();
          this.router.navigateByUrl('/home');
        }),
        (fault => {
          console.log('login failed');
          this.sending = false;
          if (fault.status === 403){
            console.log('test it is 403');
            console.log(fault.toLocaleString());
          }
          if (fault.status === 401) {
            console.log('401');
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

  fc(controlName: string): AbstractControl | null {
    return this.loginForm.get(controlName);
  }
}
