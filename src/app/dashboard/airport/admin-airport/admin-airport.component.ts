import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AirPortService } from 'src/app/service/airport.service';

export interface IAirPort {
  readonly _id: String;
  readonly description: String;
  readonly country: String;
  readonly name: String;
}
@Component({
  selector: 'air-admin-airport',
  templateUrl: './admin-airport.component.html',
  styleUrls: ['./admin-airport.component.scss']
})
export class AdminAirportComponent implements OnInit {
  countries = [];
  operetion = "";
  displayDialog: boolean;
  port: IAirPort;
  selectedport;
  newport: boolean;
  ports: IAirPort[];
  cols: any[];
  portForm: FormGroup;
  constructor(
      private portService: AirPortService,
      private fb: FormBuilder,) { }

  loadNewList(){
    this.portService.getPort().then((ports:IAirPort[]) => {
        this.ports = ports;
    });
  }
  ngOnInit() {

    this.portService.getCountries().then((suc:any)=>{
      this.countries = suc.map((e:any)=>{
        return {"label":e.name,"value":e.name}
      });
    });

    this.loadNewList();

    this.portForm = this.fb.group({
        _id: new FormControl("null", [
            Validators.required,
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]),
        description: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(500)
        ]),
        country: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(32)
        ]),
      
      });

    this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'country', header: 'Country' }
    ];
}

showDialogToAdd() {
    this.operetion = "newItem"
    this.newport = true;
    this.port = {
        _id:"11",
        name:"",
        description:"",
        country: ""
    };
    this.portForm.setValue(this.port);
    this.displayDialog = true;
}

onSubmit(){
}

save() {
    console.log(this.operetion)
    if(this.operetion === "oldItem"){
        this.portService.updatePort(this.portForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }else {
        this.portService.addPort(this.portForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.portForm.reset();
}

delete() {
    if(this.operetion === "oldItem"){
        this.portService.removePort(this.portForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.portForm.reset();
}

onRowSelect(event) {
    this.newport = false;
    this.operetion = "oldItem"
    this.port = this.cloneport(event.data);
    this.displayDialog = true;
}

cloneport(c: IAirPort): IAirPort {
    let port = {
        _id:"",
        name:"",
        description:"",
        country: ""
    };
    for (let prop in c) {
        if(prop!=="__v")
        port[prop] = c[prop];
    }
    this.portForm.setValue(port);
    return port;
}
}
