import {Component, OnInit} from '@angular/core';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'ps-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  htmlContent;

  constructor() {
  }

  ngOnInit() {
  }
}
