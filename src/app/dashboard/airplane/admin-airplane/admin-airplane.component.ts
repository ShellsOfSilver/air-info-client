import { Component, OnInit } from '@angular/core';
import { AirPlaneService } from 'src/app/service/airplane.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';

export interface IAirPlane {
  readonly _id: String;
  readonly name: String;
  readonly maxSpeed: Number;
  readonly maxDistance: Number;
  readonly description: String;
  readonly capacity: ICapacity
}

export interface ICapacity {
  readonly economy: Number;
  readonly premiumEconomy: Number;
  readonly business: Number;
  readonly first: Number;
}

@Component({
  selector: 'air-admin-airplane',
  templateUrl: './admin-airplane.component.html',
  styleUrls: ['./admin-airplane.component.scss'],
  providers: [MessageService]
})
export class AdminAirplaneComponent implements OnInit {

  operetion = "";
  displayDialog: boolean;
  plane: IAirPlane;
  selectedPlane;
  newplane: boolean;
  planes: IAirPlane[];
  cols: any[];
  planeForm: FormGroup;
  constructor(
        private messageService: MessageService,
      private planeService: AirPlaneService,
      private fb: FormBuilder,) { }

  loadNewList(){
    this.planeService.getPlanes().then((planes:IAirPlane[]) => {
        this.planes = planes;
    });
  }
  ngOnInit() {
    this.loadNewList();

    this.planeForm = this.fb.group({
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
        maxSpeed: new FormControl(0, [
          Validators.required,
          Validators.max(10000),
          Validators.min(1),
          Validators.pattern("^[0-9]*$"),
        ]),
        maxDistance: new FormControl(0, [
            Validators.required,
            Validators.max(100000),
            Validators.min(1),
            Validators.pattern("^[0-9]*$"),
          ]),
        capacity: new FormGroup({
        economy: new FormControl(0, [
            Validators.required,
            Validators.max(500),
            Validators.min(0),
            Validators.pattern("^[0-9]*$"),
          ]),
        premiumEconomy: new FormControl(0, [
            Validators.required,
            Validators.max(500),
            Validators.min(0),
            Validators.pattern("^[0-9]*$"),
          ]),
        business: new FormControl(0, [
            Validators.required,
            Validators.max(500),
            Validators.min(0),
            Validators.pattern("^[0-9]*$"),
          ]),
        first: new FormControl(0, [
            Validators.required,
            Validators.max(500),
            Validators.min(0),
            Validators.pattern("^[0-9]*$"),
          ])})
      });

    this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'maxSpeed', header: 'Max speed' },
        { field: 'maxDistance', header: 'Max distance' },
        { field: 'description', header: 'Description' },
        { field: 'capacity', header: 'Capacity' }
    ];
}

showDialogToAdd() {
    this.operetion = "newItem"
    this.newplane = true;
    this.plane = {
        _id:"11",
        name:"",
        maxSpeed: 0,
        maxDistance:0,
        description:"",
        capacity:{
             economy: 0,
             premiumEconomy: 0,
             business: 0,
             first: 0
        }
    };
    this.planeForm.setValue(this.plane);
    this.displayDialog = true;
}

onSubmit(){
}

save() {
    console.log(this.operetion)
    if(this.operetion === "oldItem"){
        this.planeService.updatePlane(this.planeForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }else {
        this.planeService.addPlanes(this.planeForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.planeForm.reset();
}

delete() {
    if(this.operetion === "oldItem"){
        this.planeService.removePlane(this.planeForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            this.messageService.add({key:"error" , severity:'error', summary: 'Error Message', detail: err.error.message});
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.planeForm.reset();
}

onRowSelect(event) {
    this.newplane = false;
    this.operetion = "oldItem"
    this.plane = this.cloneplane(event.data);
    this.displayDialog = true;
}

cloneplane(c: IAirPlane): IAirPlane {
    let plane = {
        _id:"",
        name:"",
        maxSpeed: 0,
        maxDistance:0,
        description:"",
        capacity:{
             economy: 0,
             premiumEconomy: 0,
             business: 0,
             first: 0
        }
    };
    for (let prop in c) {
        if(prop!=="__v")
        plane[prop] = c[prop];
    }
    this.planeForm.setValue(plane);
    return plane;
}

}
