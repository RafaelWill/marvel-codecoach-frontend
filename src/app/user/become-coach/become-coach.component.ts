import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PersonService} from '../../shared/service/person.service';
import {Person} from '../../shared/model/person';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-become-coach',
  templateUrl: './become-coach.component.html',
  styleUrls: ['./become-coach.component.css']
})
export class BecomeCoachComponent implements OnInit {

  private _person!: Person;
  _becomeCoachForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private personService: PersonService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => this._person = person);

    this._becomeCoachForm = this._formBuilder.group({
      fullName: '',
      motivation: '',
      topic: '',
      grade: '',
      extraTopics: this._formBuilder.array([]),
      extraGrades: this._formBuilder.array([])
    });
  }

  get person(): Person {
    return this._person;
  }

  get becomeCoachForm(): FormGroup {
    return this._becomeCoachForm;
  }

  // tslint:disable-next-line:typedef
  get extraTopics() {
    return this._becomeCoachForm.get('extraTopics') as FormArray;
  }

  // tslint:disable-next-line:typedef
  get extraGrades() {
    return this._becomeCoachForm.get('extraGrades') as FormArray;
  }

  // tslint:disable-next-line:typedef
  addExtraTopic() {
    this.extraTopics.push(this._formBuilder.control(''));
    this.extraGrades.push(this._formBuilder.control(''));
  }

  // tslint:disable-next-line:typedef
  submit() {
    console.log(this.becomeCoachForm.value);
  }
}
