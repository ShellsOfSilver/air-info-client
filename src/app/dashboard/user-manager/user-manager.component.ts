import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserApiService } from 'src/app/service/userApi.service';

export interface IUser {
  readonly _id: String;
  readonly firstName: String;
  readonly lastName: String;
  readonly password: String;
  readonly email: String;
}

@Component({
  selector: 'ps-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  countries = [];
  operetion = "";
  displayDialog: boolean;
  port: IUser;
  selectedport;
  newport: boolean;
  ports: IUser[];
  cols: any[];
  portForm: FormGroup;
  constructor(
      private userService: UserApiService,
      private fb: FormBuilder,) { }

  loadNewList(){
    this.userService.getUser().then((ports:IUser[]) => {
        this.ports = ports;
    });
  }
  ngOnInit() {


    this.loadNewList();

    this.portForm = this.fb.group({
        _id: new FormControl("null", [
            Validators.required,
        ]),
        firstName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32)
        ]),
        lastName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(32)
        ]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(32)
        ]),email: new FormControl("", [
          Validators.required,
          Validators.email
        ]),
      });

    this.cols = [
        { field: 'firstName', header: 'FirstName' },
        { field: 'lastName', header: 'LastName' },
        { field: 'email', header: 'Email' },
        //{ field: 'password', header: 'Password' }
    ];
}


showDialogToAdd() {
    this.operetion = "newItem"
    this.newport = true;
    this.port = {
        _id:"11",
        firstName:"",
        lastName:"",
        password: "",
        email: ""
    };
    this.portForm.setValue(this.port);
    this.displayDialog = true;
}

onSubmit(){
}

save() {
    console.log(this.operetion)
    if(this.operetion === "oldItem"){
        this.userService.updateUser(this.portForm.value).then(e => {
            this.loadNewList();
        }, err=>{
            console.log(err)
        });
    }else {
        this.userService.addUser(this.portForm.value).then(e => {
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
        this.userService.removeUser(this.portForm.value).then(e => {
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

cloneport(c: IUser): IUser {
    let port = {
      _id:"",
      firstName:"",
      lastName:"",
      password: "",
      email: ""
    };
    for (let prop in c) {
        if(prop!=="__v")
        port[prop] = c[prop];
    }
    this.portForm.setValue(port);
    return port;
}
}
