import { Component, OnInit } from '@angular/core';
import { AuthServiceAWS } from 'src/app/service/auth.service';

@Component({
  selector: 'ps-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.scss']
})
export class AirPortComponent implements OnInit {

  constructor(
    private userServise: AuthServiceAWS,
   ) { }
  users = [];
  load = false;
  ngOnInit() {
    this.load = true;
    this.loadData();
  }

  loadData(){
    this.userServise.getAllUsers().then((suc)=>{
      this.users = (suc as Array<any>);
      this.load = false;
    }, err=>{
      console.log(err);
      this.load = false;
     
    });
  }

  openUserInfo(user){/*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      user: user
    };
    const dialogRef = this.dialog.open(DialogUserManagerComponent, dialogConfig);

    const subscribeData = dialogRef.afterClosed().subscribe(
      data => {
        this.loadData();
      }, error => {
        console.log(error);
        this.snack.show("Something went wrong((");
      }, () => {
        subscribeData.unsubscribe();
      }
    );*/
  }

}
