import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../shared/service/person.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private readonly _registrationForm = this._formBuilder.group({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  constructor(private _personService: PersonService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._registrationForm.reset();
  }

  addPerson(): void{
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
}
