import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {UserService} from 'src/app/service/user.service';
import {AuthServiceAWS} from 'src/app/service/auth.service';
import { Router, ResolveStart, ResolveEnd, NavigationEnd } from '@angular/router';
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
      router.events.subscribe((val) => {
        if(val instanceof ResolveStart || val instanceof ResolveEnd || val instanceof NavigationEnd ){
          this.linkStyle = {};
          this.linkStyleView = {};
          this.checkRouts();
        }
        
    });

  }

  @ViewChild('op') op:OverlayPanel;
  linkStyle = {};
  linkStyleView = {};
  ngOnInit() {
    this.checkRouts()
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

  checkRouts(){
    const url = this.router.parseUrl(this.router.url).root.children.primary.segments;
    let testUrl = [];
    try{
    testUrl = [`/${url[0].path}/${url[1].path}`, url[2].path];
    } catch  (e){
      testUrl = [`/${url[0].path}`, url[1].path];
    }
    this.linksManager.forEach(e => {
      if(JSON.stringify(testUrl) === JSON.stringify(e.path)){
       this.linkStyle = e;
      }
     });
    this.links.forEach(e => {
     if(JSON.stringify(testUrl) === JSON.stringify(e.path) || (testUrl[0] === e.path[0] && testUrl[1] !== "admin") ){
      this.linkStyleView = e;
     }
    });
  }

  logOut() {
    this.op.hide();
    this.userService.removeCurrentUser();
  }
}
