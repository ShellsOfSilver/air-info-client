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
    {path:"airline", name: "Airline", icon: "fas fa-location-arrow fa-lg"},
    {path:"airport", name: "Airport", icon: "fas fa-suitcase-rolling fa-lg header-account-icon-port"},
    {path:"airplane", name: "Airplane", icon: "fas fa-plane fa-lg header-account-icon-plane"},
    {path:"aircompany", name: "Aircompany", icon: "fas fa-building fa-lg header-account-icon-company"}
  ];

  linksManager = [
    {path:"m_airline", name: "Airline manager"},
    {path:"m_airport", name: "Airport manager"},
    {path:"m_airplane", name: "Airplane manager"},
    {path:"m_aircompany", name: "Aircompany manager"},
    {path:"m_user", name: "User manager"}
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
