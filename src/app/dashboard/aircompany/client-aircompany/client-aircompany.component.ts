import { Component, OnInit } from '@angular/core';
import { AirCompanyService } from 'src/app/service/aircompany.service';
import { IAircompany } from '../admin-aircompany/admin-aircompany.component';
import { Router } from '@angular/router';

@Component({
  selector: 'air-client-aircompany',
  templateUrl: './client-aircompany.component.html',
  styleUrls: ['./client-aircompany.component.scss']
})
export class ClientAircompanyComponent implements OnInit {
  selectAirCompany: IAircompany;
  airCompany: IAircompany[];
  display: boolean = false; 
  url;
  property = "";
  constructor(private companyService: AirCompanyService,private router: Router,) { 
    this.url = this.router.parseUrl(this.router.url).root.children.primary.segments;
  }


  loadNewList(filter){
    this.companyService.getCompanyForm(filter).then((planes:IAircompany[]) => {
        this.airCompany = planes;
    });
  }

  filter(){
    this.loadNewList(this.property.trim());
  }

  ngOnInit() {
    this.loadNewList("");
    if(this.url[2].path!=='view'){
      this.companyService.getCompanyId(this.url[2].path).then(suc=>{
        this.selectAirCompany = suc[0];
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/aircompany','view']);
      })
    }
  }

  onHideDialog(){
    this.router.navigate(['/dashboard/aircompany','view']);
  }

  showDialog(airPort){
    this.router.navigate(['/dashboard/aircompany',airPort._id]);
      this.companyService.getCompanyId(airPort._id).then(suc=>{
        this.selectAirCompany = suc[0];
        this.display = true;
      }, err=>{
        this.router.navigate(['/dashboard/aircompany','view']);
      })
  }

}
