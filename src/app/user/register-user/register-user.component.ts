import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../shared/service/person.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private _personRegisteredID?: string;

  private readonly _registrationForm = this._formBuilder.group({
    firstName: '',
    lastName: '',
    userCredential: this._formBuilder.group({
        email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
        password: ['',
          [Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')]],
        confirmedPassword: ['', [Validators.required]]
      },
      {validator: this.checkIfMatchingPasswords('password', 'confirmedPassword')})
  });

  constructor(private _personService: PersonService,
              private _formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this._registrationForm.reset();
  }

  addPerson(): void {
    this._personService
      .save(this._registrationForm.value)
      .subscribe((personRegistered) => {
          this._registrationForm.reset();
          this._personRegisteredID = personRegistered.id;
        }
      );
  }

  get registrationForm(): FormGroup {
    return this._registrationForm;
  }

  submit(): void {
    this.addPerson();
    this.router.navigate(['users/' + this._personRegisteredID]);
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
