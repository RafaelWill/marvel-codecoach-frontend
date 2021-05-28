import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../shared/service/person.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Person} from '../../shared/model/person';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private readonly _registrationForm = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userCredential: this._formBuilder.group({
        email: ['', {validators: [Validators.required, Validators.email]}],
        password: ['', {
          validators:
            [Validators.required,
              Validators.minLength(8),
              Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]
        }],
        confirmedPassword: ['', [Validators.required]]
      },
      {validator: this.checkIfMatchingPasswords('password', 'confirmedPassword')})
  });
  private _date: Date | undefined;

  constructor(private _personService: PersonService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _cookieService: CookieService) {
  }

  ngOnInit(): void {
    this._registrationForm.reset();
    this._date = new Date();
    this._date.setDate( this._date.getDate() + 3 );
  }

  addPerson(): Observable<Person> {
    return this._personService
      .save(this._registrationForm.value);
  }

  submit(): void {
    if (this._registrationForm.valid) {
      this.addPerson()
        .subscribe((personRegistered) => {
            this._registrationForm.reset();
            this.setCookie(personRegistered.id);
            this._router.navigate(['users/' + personRegistered.id]);
          }
        );
    }
  }

  private setCookie(userid: string): void{
    this._cookieService.set('userid', userid, this._date, '/', environment.domain);
  }

  fc(controlName: string): AbstractControl | null {
    return this._registrationForm.get(controlName);
  }

  ucfc(controlName: string): AbstractControl | null | undefined {
    return this._registrationForm.get('userCredential')?.get(controlName);
  }

  get registrationForm(): FormGroup {
    return this._registrationForm;
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string): (group: FormGroup) => void {
    return (group) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        passwordConfirmationInput.setErrors(null);
      }
      console.log('check');
    };
  }

  updateConfirmPattern(): void {
    const password = this._registrationForm.get('userCredential')?.get('password')?.value;
    const escapedPassword = String(password).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    document.getElementById('confirmedPassword')?.setAttribute('pattern', escapedPassword);
  }
}
