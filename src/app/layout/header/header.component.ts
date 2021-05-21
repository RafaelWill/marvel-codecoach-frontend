import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


   userIdFromSessionTempHardCoded = 'e920deb1-6f95-4902-9bf7-e0f501b59198';
   coachIdFromOverviewTempHardCoded = 'e920deb1-6f95-4902-9bf7-e0f501b59198';

  constructor() { }

  ngOnInit(): void {
  }

}
