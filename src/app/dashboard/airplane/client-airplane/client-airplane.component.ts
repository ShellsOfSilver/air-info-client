import { Component, OnInit } from '@angular/core';
import { AirPlaneService } from 'src/app/service/airplane.service';
import { IAirPlane } from '../admin-airplane/admin-airplane.component';
import { Router } from '@angular/router';

@Component({
  selector: 'air-client-airplane',
  templateUrl: './client-airplane.component.html',
  styleUrls: ['./client-airplane.component.scss']
})
export class ClientAirplaneComponent implements OnInit {

  selectAirPlane: IAirPlane;
  airPlane: IAirPlane[];
  display: boolean = false; 
  url;
  property = "";
  constructor(private planeService: AirPlaneService,private router: Router,) { 
      this.url = this.router.parseUrl(this.router.url).root.children.primary.segments;
    }

  loadNewList(filter){
    this.planeService.getPlanes(filter).then((planes:IAirPlane[]) => {
        this.airPlane = planes;
    });
  }

  filter(){
    this.loadNewList(this.property.trim());
  }

  ngOnInit() {
    this.loadNewList("");
    if(this.url[2].path!=='view'){
      this.planeService.getPlanesId(this.url[2].path).then(suc=>{
        this.selectAirPlane = suc[0];
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/airplane','view']);
      })
    }
  }

  onHideDialog(){
    this.router.navigate(['/dashboard/airplane','view']);
  }

  showDialog(airPort){
    this.router.navigate(['/dashboard/airplane',airPort._id]);
      this.planeService.getPlanesId(airPort._id).then(suc=>{
        this.selectAirPlane = suc[0];
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/airplane','view']);
      })
  }

}
