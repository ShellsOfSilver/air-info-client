import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AirCompanyService } from 'src/app/service/aircompany.service';
import { AirPlaneService } from 'src/app/service/airplane.service';
import { AirPortService } from 'src/app/service/airport.service';
import { MessageService } from 'primeng/components/common/messageservice';

export interface IAircompany {
  readonly _id: String;
  readonly address: String;
  readonly name: String;
  readonly listPlanes: any[];
  readonly listAirPorts: any[];
}
@Component({
  selector: 'air-admin-aircompany',
  templateUrl: './admin-aircompany.component.html',
  styleUrls: ['./admin-aircompany.component.scss'], 
  providers: [MessageService]
})
export class AdminAircompanyComponent implements OnInit {

  listPlanes = [];
  load = 0;
  listAirPorts = [];
  operetion = "";
  displayDialog: boolean;
  company: IAircompany;
  selectedcompany;
  newcompany: boolean;
  companys: IAircompany[];
  cols: any[];
  companyForm: FormGroup;
  constructor(
      private companyService: AirCompanyService,
      private airPlane: AirPlaneService,
      private airPortService: AirPortService,
      private messageService: MessageService,
      private fb: FormBuilder,) { }

  loadNewList(){
    this.companyService.getCompany().then((companys:IAircompany[]) => {
        this.companys = companys;
    });
  }

  getDate(date, col){
    if(col.field === 'listPlanes'){
      return this.listPlanes.filter(e=>{
        let val = 0;
        date[col.field].some(element => {
          if(e.value === element){
            val = e.label;
            return val;
          }
        });
        if(val !== 0) return val;
      }).map(e=>e.label);
    } else if(col.field === 'listAirPorts'){
      return this.listAirPorts.filter(e=>{
        let val = 0;
        date[col.field].some(element => {
          if(e.value === element){
            val = e.label;
            return val;
          }
        });
        if(val !== 0) return val;
      }).map(e=>e.label);
    }
    return date[col.field];
  }

  ngOnInit() {
    
    this.airPlane.getPlanes().then((suc:any)=>{
      this.listPlanes = suc.map((e:any)=>{
        return {"label":e.name,"value":e._id}
      });
      this.load++;
      if(this.load === 2){
        this.loadNewList();
      }
    });

    this.airPortService.getPort().then((suc:any)=>{
      this.listAirPorts = suc.map((e:any)=>{
        return {"label":e.name,"value":e._id}
      });
      this.load++;
      if(this.load === 2){
        this.loadNewList();
      }
    });

    this.companyForm = this.fb.group({
        _id: new FormControl("null", [
            Validators.required,
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]),
        address: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(500)
        ]),
        listPlanes: new FormControl([], [
          Validators.required,
        ]),
        listAirPorts: new FormControl([], [
        ]),   
      });

    this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'address', header: 'Address' },
        { field: 'listPlanes', header: 'Airplanes' },
        { field: 'listAirPorts', header: 'Airports' }
    ];
}

showDialogToAdd() {
    this.operetion = "newItem"
    this.newcompany = true;
    this.company = {
        _id:"11",
        name:"",
        address: "",
        listPlanes: [],
        listAirPorts: []
    };
    this.companyForm.setValue(this.company);
    this.displayDialog = true;
}

onSubmit(){
}

save() {
    if(this.operetion === "oldItem"){
        this.companyService.updateCompany(this.companyForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }else {
        this.companyService.addCompany(this.companyForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.companyForm.reset();
}

delete() {
    if(this.operetion === "oldItem"){
        this.companyService.removeCompany(this.companyForm.value).then(e => {
            this.loadNewList();
        }, err=>{
          this.messageService.add({key:"error" , severity:'error', summary: 'Error Message', detail: err.error.message});
          console.log(err)
        });
    }
    this.displayDialog = false;
    this.companyForm.reset();
}

onRowSelect(event) {
    this.newcompany = false;
    this.operetion = "oldItem"
    this.company = this.clonecompany(event.data);
    this.displayDialog = true;
}

clonecompany(c: IAircompany): IAircompany {
    let company = {
        _id:"",
        name:"",
        address: "",
        listPlanes: [],
        listAirPorts: []
    };
    for (let prop in c) {
        if(prop!=="__v")
        company[prop] = c[prop];
    }
    this.companyForm.setValue(company);
    return company;
}


}
