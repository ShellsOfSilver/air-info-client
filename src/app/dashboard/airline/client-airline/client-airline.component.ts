import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IAirLine } from '../admin-airline/admin-airline.component';
import { AirLineService } from 'src/app/service/airline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'air-client-airline',
  templateUrl: './client-airline.component.html',
  styleUrls: ['./client-airline.component.scss'],
})
export class ClientAirlineComponent implements OnInit {

  property = "";
  selectAirLine: IAirLine | any;
  airLines: IAirLine[];
  display: boolean = false; 
  url;
  listDays = [
    {value: 1, select: false},
    {value: 2, select: false},
    {value: 3, select: false},
    {value: 4, select: false},
    {value: 5, select: false},
    {value: 6, select: false},
    {value: 7, select: false},
  ];

  constructor(private airLineService: AirLineService,private ref: ChangeDetectorRef,private router: Router,) { 
    this.url = this.router.parseUrl(this.router.url).root.children.primary.segments;
  }

  filter(){
    this.loadNewList(this.property.trim());
  }

  loadNewList(filter: string){
    this.airLineService.getFormAirLine(filter).then((planes:IAirLine[]) => {
        this.airLines = planes;
    });
  }

  ngOnInit() {
    this.loadNewList('');
    /*if(this.url[2].path!=='view'){
      this.airLineService.getAirLineId(this.url[2].path).then((suc:any)=>{
        this.listDays = [
          {value: 1, select: false},
          {value: 2, select: false},
          {value: 3, select: false},
          {value: 4, select: false},
          {value: 5, select: false},
          {value: 6, select: false},
          {value: 7, select: false},
        ];
        this.transformArrDays(suc.schedule.days)
        this.selectAirLine = suc;
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/airline','view']);
      })
    }*/
  }

  onHideDialog(){
    //this.router.navigate(['/dashboard/airline','view']);
  }

  transformArrDays(days){
    days.forEach(element => {
      this.listDays.map(e=>{
        if(e.value===element){
          e.select = true
        }
      })
    });
  }

  showDialog(airLine){
   /* this.router.navigate(['/dashboard/airline',airLine._id]);
      this.airLineService.getAirLineId(airLine._id).then((suc:any)=>{*/
        this.listDays = [
          {value: 1, select: false},
          {value: 2, select: false},
          {value: 3, select: false},
          {value: 4, select: false},
          {value: 5, select: false},
          {value: 6, select: false},
          {value: 7, select: false},
        ];
        this.transformArrDays(airLine.schedule.days)
        this.selectAirLine = airLine;
        this.display = true;
    /*  }, err=>{
        this.router.navigate(['/dashboard/airline','view']);
      })*/
  }

}
