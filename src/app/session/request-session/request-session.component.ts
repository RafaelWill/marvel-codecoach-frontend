import {Component, OnInit} from '@angular/core';
import {ScriptService} from '../../shared/service/script/script.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../../shared/service/session.service';

@Component({
  selector: 'app-request-session',
  templateUrl: './request-session.component.html',
  styleUrls: ['./request-session.component.css']
})
export class RequestSessionComponent implements OnInit {

  hasSubmitFailed!: boolean;
  private _coachIdFromRoute!: string;
  private userIdFromSessionTempHardCoded = 'e920deb1-6f95-4902-9bf7-e0f501b59198';

  private readonly _requestSessionForm = this._formBuilder.group({
      topic: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      location: ['', [Validators.required]],
      remarks: ''
    }
    // ,    {validator: this._checkifValidTime('time', 'date')    }
  );

  constructor(private _scriptService: ScriptService,
              private _formBuilder: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _sessionService: SessionService) {
  }

  ngOnInit(): void {
    this._scriptService.load('init');
    this.hasSubmitFailed = false;

    const routeParams = this._activatedRoute.snapshot.paramMap;
    this._coachIdFromRoute = String(routeParams.get('coachId'));
  }

  fc(controlName: string): AbstractControl | null {
    return this._requestSessionForm.get(controlName);
  }

  submit(): void {
    if (this._requestSessionForm.valid) {
      this.requestSession().subscribe(
        () => {
          this._requestSessionForm.reset();
          this._router.navigate([`users/${this.userIdFromSessionTempHardCoded}`]);
        });
    } else {
      this.hasSubmitFailed = true;
    }
  }

  private requestSession(): Observable<any> {
    return this._sessionService.save(this._requestSessionForm.value, this._coachIdFromRoute);
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
