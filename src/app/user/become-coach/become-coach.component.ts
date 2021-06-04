import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {PersonService} from '../../shared/service/person.service';
import {Person} from '../../shared/model/person';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {InitService} from '../../shared/materialize/init.service';
import {AuthenticationService} from '../../shared/service/authentication.service';

@Component({
  selector: 'app-become-coach',
  templateUrl: './become-coach.component.html',
  styleUrls: ['./become-coach.component.css']
})
export class BecomeCoachComponent implements OnInit, AfterViewInit {

  private _person!: Person;
  _becomeCoachForm!: FormGroup;
  hasSubmitFailed!: boolean;
  userId!: string | null;
  sending!: boolean;

  constructor(private _formBuilder: FormBuilder,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              private _initService: InitService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.hasSubmitFailed = false;
    this.userId = this.authenticationService.getUserId();
    const routeParams = this.route.snapshot.paramMap;
    const personIdFromRoute = String(routeParams.get('id'));
    this.personService
      .findById(personIdFromRoute)
      .subscribe(person => { this._person = person; });

    this._becomeCoachForm = this._formBuilder.group({
      motivation: ['', [Validators.required] ],
      topic: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      extraTopics: this._formBuilder.array([]),
      extraGrades: this._formBuilder.array([])
    });
  }

  ngAfterViewInit(): void {
    this._initService.initFormSelect();
  }

  // TODO refactor of form needed to make this work properly
  duplicateTopicValidator(index: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let duplicateValue = false;
      for (let i = 0; i < index; i++){
        if (this.extraTopics.at(i).value === control.value){
          duplicateValue = true;
        }
      }
      if (this.fc('topic')?.value === control.value){
        duplicateValue = true;
      }
      return duplicateValue ? {duplicateTopic: {value: control.value}} : null;
    };
  }

  addSlot(): void {
    this.extraTopics.push(this._formBuilder.control('', [Validators.required]));
    this.extraTopics.at(this.extraTopics.length - 1).markAsUntouched({onlySelf: true});
    this.extraGrades.push(this._formBuilder.control('', [Validators.required]));
    this.extraGrades.at(this.extraGrades.length - 1).markAsUntouched({onlySelf: true});
    this._initService.initFormSelect();
  }

  deleteSlot(): void {
    this.extraTopics.removeAt(length - 1);
    this.extraGrades.removeAt(length - 1);
  }

  submit(): void {
    this.sending = true;
    if (this._becomeCoachForm.valid) {
      this.becomeACoach().subscribe(
        () =>  {
          this._becomeCoachForm.reset();
          this.router.navigate([`users/${this.userId}/my-coach-profile`]);
          this.personService.hasBecomeCoach();
        });
    } else {
      this.hasSubmitFailed = true;
      this.sending = false;
    }
  }

  private becomeACoach(): Observable<any> {
    return this.personService.becomeCoach(this.person.id, this._becomeCoachForm.value);
  }

  fc(controlName: string): AbstractControl | null {
    return this._becomeCoachForm.get(controlName);
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
}
