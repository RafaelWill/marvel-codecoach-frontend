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
  emailNotExist!: boolean;
  correctEmailButWrongPassword!: boolean;
  loginForm;
  title = 'Sign in';
  userId?: string | null;

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
          this.userId = this.authenticationService.getUserId();
          this.router.navigateByUrl( `users/${this.userId}`);
        }),
        (fault => {
          console.log('login failed');
          this.sending = false;
          if (fault.status === 418){
            this.correctEmailButWrongPassword = true;
            this.emailNotExist = false;
            console.log('test: Status is 418 pwd');
          }
          else if (fault.status === 401) {
            console.log('test: Status is 401');
            this.emailNotExist = true;
            this.correctEmailButWrongPassword = false;
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
