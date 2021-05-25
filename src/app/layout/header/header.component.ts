import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


   userIdFromSessionTempHardCoded = 'ee1c4817-ec86-42cb-88e0-381a45e6e2ad';
   coachIdFromOverviewTempHardCoded = 'ee1c4817-ec86-42cb-88e0-381a45e6e2ad';

  constructor() { }

  ngOnInit(): void {
  }

}
