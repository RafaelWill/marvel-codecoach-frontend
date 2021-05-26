import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../shared/service/person.service';
import {Person} from '../../shared/model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-become-coach',
  templateUrl: './become-coach.component.html',
  styleUrls: ['./become-coach.component.css']
})
export class BecomeCoachComponent implements OnInit {

  private _person!: Person;
  _becomeCoachForm!: FormGroup;
  hasSubmitFailed!: boolean;

  constructor(private _formBuilder: FormBuilder,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.hasSubmitFailed = false;
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => this._person = person);

    this._becomeCoachForm = this._formBuilder.group({
      motivation: ['', [Validators.required] ],
      topic: ['', [Validators.required]],
      grade: ['', [Validators.required]],
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

  get extraTopics(): FormArray {
    return this._becomeCoachForm.get('extraTopics') as FormArray;
  }

  get extraGrades(): FormArray {
    return this._becomeCoachForm.get('extraGrades') as FormArray;
  }

  addSlot(): void {
    this.extraTopics.push(this._formBuilder.control('', [Validators.required]));
    this.extraTopics.at(this.extraTopics.length - 1).markAsUntouched({onlySelf: true});
    this.extraGrades.push(this._formBuilder.control('', [Validators.required]));
    this.extraGrades.at(this.extraGrades.length - 1).markAsUntouched({onlySelf: true});
  }

  deleteSlot(): void {
    this.extraTopics.removeAt(length - 1);
    this.extraGrades.removeAt(length - 1);
  }

  submit(): void {
    if (this._becomeCoachForm.valid) {
      this.becomeACoach().subscribe(
        () =>  {
          this._becomeCoachForm.reset();
          this.router.navigate(['users/' + this.person.id ]); });
    } else {
      this.hasSubmitFailed = true;
    }
  }

  private becomeACoach(): Observable<any> {
    return this.personService.becomeCoach(this.person.id, this._becomeCoachForm.value);
  }

  fc(controlName: string): AbstractControl | null {
    return this._becomeCoachForm.get(controlName);
  }
}
