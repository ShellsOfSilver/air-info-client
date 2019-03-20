import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ps-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() data: string;
  @Input() dialogRef;
  constructor() { }

  ngOnInit() {
  }

}
 