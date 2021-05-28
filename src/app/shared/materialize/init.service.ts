import { Injectable } from '@angular/core';
import * as M from 'materialize-css';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor() { }

  initDropdowns(): void {
    setTimeout(() => {
      console.log('init dropdowns');
      M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {coverTrigger: false});
    }, 1);
  }

  initCollapsible(): void {
    setTimeout(() => {
      console.log('init dropdowns');
      M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    }, 1);
  }

  autoInit(): void {
    // try to avoid using this function. Since it might break the others
    setTimeout(() => {
      console.log('auto init');
      M.AutoInit();
    }, 1);
  }

  initFormSelect(): void {
    setTimeout(() => {
      console.log('init form select');
      M.FormSelect.init(document.querySelectorAll('select'), {classes: '', dropdownOptions: {coverTrigger: false}});
    }, 1);
  }

  initParalax(): void {
    setTimeout(() => {
      console.log('init parallax');
      M.Parallax.init(document.querySelectorAll('.parallax'));
    }, 1);
  }

  initSidenav(): void {
    setTimeout(() => {
      console.log('init sidenav');
      M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }, 1);
  }

  initModal(): void {
    setTimeout(() => {
      console.log('init modal');
      M.Modal.init(document.querySelectorAll('.modal'));
    }, 1);
  }

  initDatepicker(): void{
    setTimeout( () => {
      console.log('init datepicker');
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
    console.log('init timepicker');
    M.Timepicker.init(document.querySelectorAll('.timepicker'), options);
    }, 1);
  }

}
