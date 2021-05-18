import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-become-coach',
  templateUrl: './become-coach.component.html',
  styleUrls: ['./become-coach.component.css']
})
export class BecomeCoachComponent implements OnInit {

  _becomeCoachForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._becomeCoachForm = this._formBuilder.group({
      fullName: '',
      motivation: '',
      topic: '',
      extraTopics: this._formBuilder.array([])
    });
  }

  get becomeCoachForm(): FormGroup {
    return this._becomeCoachForm;
  }

  // tslint:disable-next-line:typedef
  get alternateTopics() {
    return this._becomeCoachForm.get('extraTopics') as FormArray;
  }

  // tslint:disable-next-line:typedef
  addAlternateTopic() {
    this.alternateTopics.push(this._formBuilder.control(''));
  }

  // tslint:disable-next-line:typedef
  submit() {
    console.log(this.becomeCoachForm.value);
  }
}
