import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceAWS } from 'src/app/service/auth.service';

@Component({
  selector: 'ps-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @Input("dialogRef") dialogRefParent;
  registrationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceAWS) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      login: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{4,}$'),

      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{4,}$'),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}$'),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z]{2,}$'),
      ])
    });
  }

  onSubmit(){
   // this.snack.show("Please sign up via google");
    //this.dialogRefParent.close();
  } 

  openLogin(){/*
    this.dialogRefParent.close();
    if(this.statusDialog.getStatus()){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        name: "Login"
      };

      const dialogRef = this.dialog.open(AuthModalComponent, dialogConfig);

      const subscribeData = dialogRef.afterClosed().subscribe(
        data => {
          if (data) { 
            console.log(data);
          }
        }, error => {
          console.log(error);
        }, () => {
          subscribeData.unsubscribe();
        }
      );
    }*/
  }

  socialSignIn(socialPlatform: string){/*
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      // socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'linkedin') {
      // socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    } 

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData)
        this.authService.signup(userData).then(success => {
          console.log(success);
          this.dialogRefParent.close();
        },error => {
          console.log(error);
        });
      }
    );*/
  }

}
