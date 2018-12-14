import {Component, Injectable, OnInit} from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  constructor(private loader: LoadingBarService) {
  }


}
