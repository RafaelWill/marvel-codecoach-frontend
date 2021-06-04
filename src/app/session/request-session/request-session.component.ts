import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../../shared/service/session.service';
import {PersonService} from '../../shared/service/person.service';
import {Person} from '../../shared/model/person';
import {InitService} from '../../shared/materialize/init.service';
import {CoachingTopic} from '../../shared/model/coaching-topic';
import {AuthenticationService} from '../../shared/service/authentication.service';

@Component({
  selector: 'app-request-session',
  templateUrl: './request-session.component.html',
  styleUrls: ['./request-session.component.css']
})

export class RequestSessionComponent implements OnInit, AfterViewInit {

  hasSubmitFailed!: boolean;
  private _coach!: Person;
  private _coachIdFromRoute!: string;
  private userId!: string | null;
  sending!: boolean;

  private readonly _requestSessionForm = this._formBuilder.group({
      topic: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      location: ['', [Validators.required]],
      remarks: ''
    }
    , {validator: this._checkifValidTime('time', 'date')}
  );

  constructor(private _initService: InitService,
              private _formBuilder: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _sessionService: SessionService,
              private _personService: PersonService,
              private _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    // TODO: much better to use sessionStorage or localStorage for
    // this in combination with an angular service (like for example login-service)
    this.userId = this._authenticationService.getUserId();
    this.hasSubmitFailed = false;
    const routeParams = this._activatedRoute.snapshot.paramMap;
    this._coachIdFromRoute = String(routeParams.get('coachId'));
    this._personService.findById(this._coachIdFromRoute).subscribe((coach) => (this._coach = coach));
  }

  ngAfterViewInit(): void {
    this._initService.initFormSelect();
    this._initService.initDatepicker();
    this._initService.initTimepicker();
  }

  fc(controlName: string): AbstractControl | null {
    return this._requestSessionForm.get(controlName);
  }

  submit(): void {
    this.sending = true;
    if (this._requestSessionForm.valid) {
      this._requestSessionForm.addControl('coacheeId', new FormControl(this.userId));
      this.requestSession().subscribe(
        () => {
          this._requestSessionForm.reset();
          this._router.navigate([`users/${this.userId}`]);
        });
    } else {
      this.hasSubmitFailed = true;
      this.sending = false;
    }
  }

  private requestSession(): Observable<any> {
    return this._sessionService.save(this._requestSessionForm.value);
  }


  transferDataFromDatepickerToFormControl($event: Event): void {
    this._requestSessionForm.controls.date.setValue(($event.target as HTMLInputElement).value);
  }

  transferDataFromTimepickerToFormControl($event: Event): void {
    this._requestSessionForm.controls.time.setValue(($event.target as HTMLInputElement).value);
  }

  get coachTopics(): CoachingTopic[] {
    return this._coach.coachingTopics;
  }

  get requestSessionForm(): FormGroup {
    return this._requestSessionForm;
  }


  private _checkifValidTime(formTimeText: string, formDateText: string): (group: FormGroup) => void {
    return (group) => {
      const timeInput = group.controls[formTimeText];
      const dateInput = group.controls[formDateText];

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      const currentDate = dd + '/' + mm + '/' + yyyy;
      const currentTime = today.getHours() + ':' + today.getMinutes();

      if ((dateInput.value === currentDate) && (timeInput.value < currentTime)) {
        timeInput.setErrors({earlierThanNow: true});
      } else {
        timeInput.setErrors(null);
      }
    };
  }

}
