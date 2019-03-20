import {Component, OnInit, Input} from '@angular/core';
import {AuthServiceAWS} from 'src/app/service/auth.service';
import {UserService} from 'src/app/service/user.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'air-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthServiceAWS) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,

      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{4,}$'),
      ])
    });
  }

  showError(){
    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Authorization failed'});
  }

  showSuccess(){
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Successful authorization'});
  }


  onSubmit(){
    this.authService.signin(this.loginForm.value).then(suc=>{
        this.userService.setCurrentUser(suc);
        this.showSuccess();
    }, err=>{
        this.showError();
    });
  }

}
