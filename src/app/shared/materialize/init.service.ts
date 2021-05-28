import { Injectable } from '@angular/core';
import * as M from 'materialize-css';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor() { }

  initDropdowns(): void {
    setTimeout(() => {
      M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {coverTrigger: false});
    }, 1);
  }

  initCollapsible(): void {
    setTimeout(() => {
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    }, 1);
  }

  autoInit(): void {
    // try to avoid using this function. Since it might break the others
    setTimeout(() => {
      M.AutoInit();
    }, 1);
  }

  initFormSelect(): void {
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'), {classes: '', dropdownOptions: {coverTrigger: false}});
    }, 1);
  }

  initParalax(): void {
    setTimeout(() => {
      M.Parallax.init(document.querySelectorAll('.parallax'));
    }, 1);
  }

  initSidenav(): void {
    setTimeout(() => {
      M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }, 1);
  }

  initModal(): void {
    setTimeout(() => {
      M.Modal.init(document.querySelectorAll('.modal'));
    }, 1);
  }

  initDatepicker(): void{
    setTimeout( () => {
      const currDate = (new Date());
      const currYear = (new Date()).getFullYear();
      const options = {
        defaultDate: new Date(currDate),
        setDefaultDate: false,
        minDate: new Date(currDate),
        maxDate: new Date(currYear + 1, 12, 31),
        yearRange: [currYear, currYear + 1],
        format: 'dd/mm/yyyy',
        autoClose: true
      };
      M.Datepicker.init(document.querySelectorAll('.datepicker'), options);
    }, 1);
  }

  initTimepicker(): void{
    const options = {
      twelveHour: false,
      autoClose: true
    };
    setTimeout( () => {
    M.Timepicker.init(document.querySelectorAll('.timepicker'), options);
    }, 1);
  }

}
