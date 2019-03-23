import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AirLineService } from 'src/app/service/airline.service';
import { AirPortService } from 'src/app/service/airport.service';
import { IAirPort } from '../../airport/admin-airport/admin-airport.component';
import { IAirPlane } from '../../airplane/admin-airplane/admin-airplane.component';
import { AirPlaneService } from 'src/app/service/airplane.service';
import { AirCompanyService } from 'src/app/service/aircompany.service';
import { IAircompany } from '../../aircompany/admin-aircompany/admin-aircompany.component';

export interface IAirLine {
  readonly _id: String;
  readonly idAirCompany: String | any;
  readonly idPlane: String | any;
  readonly flights: String;
  readonly direction: IDirection;
  readonly note: String; 
  readonly status: Status | any;
  readonly schedule: ISchedule;
  readonly flightType: FlightType | any;
}

export enum FlightType {
  ScheduledPassanger, //Пассажириский по расписанию
  ScheduledCargo, // Грузовой, но только с письмами.
  Military
}

export interface IDirection{
  readonly fromIdAirPort: String | any;
  readonly toIdAirPort: String | any;
}

export enum Status {
  Active,
  Canceled,
  Diverted, // Была произведена смена пункта назначения (например, по метео-условиям)
  DN, // Data source needed — Неоткуда получить информацию о статусе
  Landed,
  NotOperational,
  Scheduled,
  Unknown
}

export interface ISchedule{
  readonly startFly: String | any;
  readonly endFly: String | any;
  readonly days: any[] | any;
}

@Component({
  selector: 'air-admin-airline',
  templateUrl: './admin-airline.component.html',
  styleUrls: ['./admin-airline.component.scss']
})
export class AdminAirlineComponent implements OnInit {

  operetion = "";
  displayDialog: boolean;
  plane: IAirLine;
  selectedAirLine;
  newplane: boolean;
  planes: IAirLine[];
  airPorts: IAirPort[];
  airPlane: IAirPlane[];
  airCompany: IAircompany[];
  loadCount = 0;
  cols: any[];
  listStatus = [
    {name: 'Active'},
    {name: 'Canceled'},
    {name: 'Diverted'},
    {name: 'DN'}, 
    {name: 'Landed'},
    {name: 'NotOperational'},
    {name: 'Scheduled'},
    {name: 'Unknown'}
  ];
  listDays = [
    {value: 1, select: false},
    {value: 2, select: false},
    {value: 3, select: false},
    {value: 4, select: false},
    {value: 5, select: false},
    {value: 6, select: false},
    {value: 7, select: false},
  ];
  listTypes = [
    {name: 'ScheduledPassanger'},
    {name: 'ScheduledCargo'},
    {name: 'Military'},
  ];
  airLineForm: FormGroup;
  constructor(
      private airPortService: AirPortService,
      private airPlaneService: AirPlaneService,
      private airCompanyService: AirCompanyService,
      private airLineService: AirLineService,
      private fb: FormBuilder,) { }

  loadNewList(){
    this.airLineService.getAirLine().then((planes:IAirLine[]) => {
        this.planes = planes;
        this.loadCount++;
    });
  }

  loadAirPlane(){
    this.airPlaneService.getPlanes().then((plane:IAirPlane[]) => {
        this.airPlane = plane;
        this.loadCount++;
    });
  }

  loadAirCompany(){
    this.airCompanyService.getCompany().then((companys:IAircompany[]) => {
        this.airCompany = companys;
        this.loadCount++;
    });
  }

  loadAirPorts(){
    this.airPortService.getPort().then((air:IAirPort[]) => {
        this.airPorts = air;
        this.loadCount++;
    });
  }

  setSelect(day){
    let newDays = [];
    this.listDays.map(e=>{
      if(e===day){
        e.select = !e.select
      }
      if(e.select){
        newDays.push(e.value)
      }
    })
    const schedule = (this.airLineForm.controls.schedule as FormGroup);
    schedule.controls['days'].setValue(newDays);
  }

  ngOnInit() {
    this.loadNewList();
    this.loadAirPorts();
    this.loadAirCompany();
    this.loadAirPlane();
    this.airLineForm = this.fb.group({
        _id: new FormControl("null", [
            Validators.required,
        ]),
        flights: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]),
        note: new FormControl("", [
            Validators.maxLength(128)
        ]),
        idAirCompany: new FormControl("", [
          Validators.required
        ]),
        idPlane: new FormControl("", [
          Validators.required
        ]),
        status: new FormControl("", [
          Validators.required
        ]),
        flightType: new FormControl("", [
          Validators.required
        ]),
        direction: new FormGroup({
          fromIdAirPort: new FormControl("", [
              Validators.required
            ]),
            toIdAirPort: new FormControl("", [
              Validators.required
        ])}),
        schedule: new FormGroup({
          startFly: new FormControl("", [
              Validators.required
            ]),
            endFly: new FormControl("", [
              Validators.required
            ]),
            days: new FormControl([], [
              Validators.required
        ])})
        
      });

    this.cols = [
        { field: 'flights', header: 'flights' },
        { field: 'direction', header: 'Direction' },
        { field: 'status', header: 'Status' },
        { field: 'idAirCompany', header: 'AirCompany' },
        { field: 'idPlane', header: 'Plane' },
        { field: 'flightType', header: 'Type' },
        { field: 'schedule', header: 'Schedule' },
        { field: 'note', header: 'Note' },
    ];
}

showDialogToAdd() {
    this.operetion = "newItem"
    this.newplane = true;
    this.plane = {
      _id:"0",
      idAirCompany:"",
      idPlane: "",
      flights:"",
      note:"",
      direction:{
        fromIdAirPort: "",
        toIdAirPort: ""
      },
      status: Status.Unknown,
      schedule: {
        startFly: "",
        endFly: "",
        days: []
      },
      flightType: FlightType.ScheduledPassanger
    };
    this.airLineForm.setValue(this.plane);
    this.displayDialog = true;
}

onSubmit(){
}

transformForm(form){
  this.listDays = [
    {value: 1, select: false},
    {value: 2, select: false},
    {value: 3, select: false},
    {value: 4, select: false},
    {value: 5, select: false},
    {value: 6, select: false},
    {value: 7, select: false},
  ]
  form.status = form.status.name;
  form.flightType = form.flightType.name;
  form.idPlane = form.idPlane._id;
  form.idAirCompany = form.idAirCompany._id;
  form.direction.fromIdAirPort = form.direction.fromIdAirPort._id;
  form.direction.toIdAirPort = form.direction.toIdAirPort._id;
  return form;
}

save() {
    const newForm = this.transformForm(this.airLineForm.value);
    if(this.operetion === "oldItem"){
        this.airLineService.updateAirLine(newForm).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }else {
        this.airLineService.addAirLine(newForm).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.airLineForm.reset();
}

delete() {
    if(this.operetion === "oldItem"){
        this.airLineService.removeAirLine(this.airLineForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }
    this.displayDialog = false;
    this.airLineForm.reset();
}

onRowSelect(event) {
    this.newplane = false;
    this.operetion = "oldItem"
    this.plane = this.cloneplane(event.data);
    this.displayDialog = true;
}

cloneplane(c: IAirLine): IAirLine {
  this.listDays = [
    {value: 1, select: false},
    {value: 2, select: false},
    {value: 3, select: false},
    {value: 4, select: false},
    {value: 5, select: false},
    {value: 6, select: false},
    {value: 7, select: false},
  ]
    let plane = {
        _id:"",
        idAirCompany:{},
        idPlane: {},
        flights:"",
        note:"",
        direction:{
          fromIdAirPort: {},
          toIdAirPort: {}
        },
        status: {name: String},
        schedule: {
          startFly: "",
          endFly: "",
          days: []
        },
        flightType: {name: String}
    };
    for (let prop in c) {
        if(prop!=="__v"){
          switch(prop){
            case 'status':
                plane[prop] =  {name: c[prop]};
              break;
            case 'flightType':
              plane[prop] =  {name: c[prop]};
              break;
            case 'idAirCompany':
              plane[prop] = this.airCompany.filter((e: any)=>e._id === c[prop])[0];
              break;
            case 'idPlane':
              plane[prop] =  this.airPlane.filter((e: any)=>e._id === c[prop])[0];
              break;
            case 'direction':
              plane[prop] =  {
                fromIdAirPort: this.airPorts.filter((e: any)=>e._id === c[prop].fromIdAirPort)[0],
                toIdAirPort: this.airPorts.filter((e: any)=>e._id === c[prop].toIdAirPort)[0]
              }
              break;
            case 'schedule':
              plane[prop] =  {
                endFly: c[prop].endFly,
                startFly: c[prop].endFly,
                days: c[prop].days
              }
              this.transformArrDays(c[prop].days)
              break;
            default:
                plane[prop] = c[prop];
              break;
          }
          
        }
    }
    this.airLineForm.setValue(plane);
    return plane;
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
showData(rowData, col){
  switch(col.field){
    case "direction":
      const fromIdAirPort = this.airPorts.filter((e: any)=>e._id === rowData[col.field].fromIdAirPort)[0];
      const toIdAirPort = this.airPorts.filter((e: any)=>e._id === rowData[col.field].toIdAirPort)[0];
      return `${fromIdAirPort.name}(${fromIdAirPort.country}) - ${toIdAirPort.name}(${toIdAirPort.country})`;
    case "idAirCompany":
      const idAirCompany = this.airCompany.filter((e: any)=>e._id === rowData[col.field])[0];
      return `${idAirCompany.name}`;
    case "idPlane":
      const idPlane = this.airPlane.filter((e: any)=>e._id === rowData[col.field])[0];
      return `${idPlane.name}`;
    case "schedule":
      return `${rowData[col.field].startFly} - ${rowData[col.field].endFly} days [ ${rowData[col.field].days} ]`;
    default:
      return rowData[col.field]
  }
  
}
}
