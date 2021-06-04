import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../shared/service/person.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Person} from '../../shared/model/person';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {LocalStorageService} from '../../shared/service/local-storage.service';

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
  loginData: FormGroup | undefined;
  userId!: string | null;
  sending!: boolean;
  error!: boolean;
  emailExist!: boolean;

  constructor(private _personService: PersonService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private authenticationService: AuthenticationService,
              private _localStorage: LocalStorageService) {
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
    this.sending = true;
    if (this._registrationForm.valid) {
      this.addPerson()
        .subscribe((personRegistered) => {
            this.loginData = this._formBuilder.group({
              email: this._registrationForm.get('userCredential')?.get('email')?.value,
              password: this._registrationForm.get('userCredential')?.get('password')?.value
            });
            this._registrationForm.reset();
            this.authenticationService.login(this.loginData.value).subscribe( () => {
              this.userId = this.authenticationService.getUserId();
              this.sending = false;
              this._router.navigate([`users/${this._localStorage.get('userId')}`]);
            });
          },
          err => {
            console.log('registration failed');
            this.sending = false;
            if (err.status === 400) {
              this.emailExist = true;
              this.error = false;
            } else {
              console.log(err);
              this.error = true;
              this.emailExist = false;
            }
          }
        );
    }
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
    };
  }

  updateConfirmPattern(): void {
    const password = this._registrationForm.get('userCredential')?.get('password')?.value;
    const escapedPassword = String(password).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    document.getElementById('confirmedPassword')?.setAttribute('pattern', escapedPassword);
  }
}
