import { Component, OnInit } from '@angular/core';
import { AirPortService } from 'src/app/service/airport.service';
import { IAirPort } from '../admin-airport/admin-airport.component';
import { Router } from '@angular/router';

@Component({
  selector: 'air-client-airport',
  templateUrl: './client-airport.component.html',
  styleUrls: ['./client-airport.component.scss']
})
export class ClientAirportComponent implements OnInit {

  selectAirPort: IAirPort | any;
  airPorts: IAirPort[];
  display: boolean = false; 
  url;
  property = "";
  constructor(private portService: AirPortService,
    private router: Router,) { 
      this.url = this.router.parseUrl(this.router.url).root.children.primary.segments;
    }

  loadNewList(filter){
    this.portService.getPort(filter).then((planes:IAirPort[]) => {
        this.airPorts = planes;
    });
  }

  filter(){
    this.loadNewList(this.property.trim());
  }

  ngOnInit() {
    this.loadNewList("");
    if(this.url[2].path!=='view'){
      this.portService.getPortId(this.url[2].path).then(suc=>{
        this.selectAirPort = suc[0];
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/airport','view']);
      })
    }
  }

  onHideDialog(){
    this.router.navigate(['/dashboard/airport','view']);
  }

  showDialog(airPort){
    this.router.navigate(['/dashboard/airport',airPort._id]);
      this.portService.getPortId(airPort._id).then(suc=>{
        this.selectAirPort = suc[0];
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/airport','view']);
      })
  }

}
