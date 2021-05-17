import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../shared/service/person.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

// TODO: add pwd validation
  private readonly _registrationForm = this._formBuilder.group({
    firstName: '',
    lastName: '',
    userCredential: this._formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')]],
      confirmedPassword: ['', [Validators.required]]
    },
      {validator: this.checkIfMatchingPasswords('password', 'confirmedPassword')})
  });

  constructor(private _personService: PersonService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._registrationForm.reset();
  }

  addPerson(): void {
    this._personService
      .save(this._registrationForm.value)
      .subscribe(() => this._registrationForm.reset());
  }

  get registrationForm(): FormGroup {
    return this._registrationForm;
  }

  submit(): void {
    this.addPerson();
  }

// tslint:disable-next-line:typedef
checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    // tslint:disable-next-line:one-variable-per-declaration
    const passwordInput = group.controls[passwordKey],
      passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true});
    }
    else {
      return passwordConfirmationInput.setErrors(null);
    }
  };
}
}
