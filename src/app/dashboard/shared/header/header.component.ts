import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {UserService} from 'src/app/service/user.service';
import {AuthServiceAWS} from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'ps-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  user: any;
  userStatus = false;

  links = [
    {path:['/dashboard/airline','view'], name: "Airline", icon: "fas fa-location-arrow fa-lg"},
    {path:['/dashboard/airport','view'], name: "Airport", icon: "fas fa-suitcase-rolling fa-lg header-account-icon-port"},
    {path:['/dashboard/airplane','view'], name: "Airplane", icon: "fas fa-plane fa-lg header-account-icon-plane"},
    {path:['/dashboard/aircompany','view'], name: "Aircompany", icon: "fas fa-building fa-lg header-account-icon-company"}
  ];

  linksManager = [
    {path:['/dashboard/airline','admin'], name: "Airline manager"},
    {path:['/dashboard/airport','admin'], name: "Airport manager"},
    {path:['/dashboard/airplane','admin'], name: "Airplane manager"},
    {path:['/dashboard/aircompany','admin'], name: "Aircompany manager"},
    {path:['/dashboard','user'], name: "User manager"}
  ];

  constructor(
    public userService: UserService,
    private router: Router,
    private authService: AuthServiceAWS) {
  }
  @ViewChild('op') op:OverlayPanel;

  ngOnInit() {
    this.userService.getCurrentUserObs().subscribe(suc=>{
      if(suc){
        this.op.hide();
        this.userStatus = false;
      } else {
        this.op.hide();
        this.userStatus = true;
      }
    }, err=>{
      console.log(err);
    });
  }

  logOut() {
    this.op.hide();
    this.userService.removeCurrentUser();
  }
}
