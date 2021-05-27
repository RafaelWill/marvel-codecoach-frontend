import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../../shared/service/session.service';
import {PersonService} from '../../shared/service/person.service';
import {Person} from '../../shared/model/person';
import {InitService} from '../../shared/materialize/init.service';
import {CookieService} from 'ngx-cookie-service';
import {CoachingTopic} from '../../shared/model/coaching-topic';

@Component({
  selector: 'app-request-session',
  templateUrl: './request-session.component.html',
  styleUrls: ['./request-session.component.css']
})

export class RequestSessionComponent implements OnInit, AfterViewInit {

  hasSubmitFailed!: boolean;
  private _coach!: Person;
  private _coachIdFromRoute!: string;
  private userId = '';

  _requestSessionForm!: FormGroup;

  // private readonly _requestSessionForm = this._formBuilder.group({
  //     topic: ['', [Validators.required]],
  //     date: ['', [Validators.required]],
  //     time: ['', [Validators.required]],
  //     location: ['', [Validators.required]],
  //     remarks: ''
  //   }
  //   // ,    {validator: this._checkifValidTime('time', 'date')    }
  // );

  constructor(private _initService: InitService,
              private _formBuilder: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _sessionService: SessionService,
              private _personService: PersonService,
              private _cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.userId = this._cookieService.get('userid');
    this.hasSubmitFailed = false;
    const routeParams = this._activatedRoute.snapshot.paramMap;
    this._coachIdFromRoute = String(routeParams.get('coachId'));
    // tslint:disable-next-line:max-line-length
    this._personService.findById(this._coachIdFromRoute).subscribe((coach) => { this._coach = coach; });

    this._requestSessionForm = this._formBuilder.group({
        topic: ['', [Validators.required]],
        date: ['', [Validators.required]],
        time: ['', [Validators.required]],
        location: ['', [Validators.required]],
        remarks: ''
      }
      // ,    {validator: this._checkifValidTime('time', 'date')    }
    );
  }

  ngAfterViewInit(): void {
    this._initService.initFormSelect();
  }

  fc(controlName: string): AbstractControl | null {
    return this._requestSessionForm.get(controlName);
  }

  submit(): void {
    if (this._requestSessionForm.valid) {
      this._requestSessionForm.addControl('coacheeId', new FormControl(this.userId));
      this.requestSession().subscribe(
        () => {
          this._requestSessionForm.reset();
          this._router.navigate([`users/${this.userId}`]);
        });
    } else {
      this.hasSubmitFailed = true;
    }
  }

  private requestSession(): Observable<any> {
    return this._sessionService.save(this._requestSessionForm.value);
  }

  get coachTopics(): CoachingTopic[]{
    // return ['mock1', 'mock2', 'when backend is implemented', 'update get coachTopics()', 'it is ready :)' ];
    return this._coach.coachingTopics;
  }

  get requestSessionForm(): FormGroup {
    return this._requestSessionForm;
  }


  private _checkifValidTime(formTimeText: string, formDateText: string): (group: FormGroup) => void {
    return (group) => {
      const timeInput = group.controls[formTimeText];
      const dateInput = group.controls[formDateText];
      const datetimeInput = dateInput + ' ' + timeInput;

      const currentDate = new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
      const currentTime = new Date().getHours() + ':' + new Date().getMinutes();

      console.log(dateInput.value);
      console.log(currentDate);
      console.log(timeInput.value);
      console.log(currentTime);

      // if (Date.parse(datetimeInput) < Date.now()) {
      if ((dateInput.value === currentDate) &&
        (Date.parse(timeInput.value) < Date.parse(currentTime))
      ) {
        timeInput.setErrors({earlierThanNow: true});
        console.log('bingo');
      } else {
        timeInput.setErrors(null);
        console.log('all ok');
      }
    };
  }
}
