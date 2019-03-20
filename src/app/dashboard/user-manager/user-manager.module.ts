import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { UserManagerComponent } from './user-manager.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';


@NgModule({
  declarations: [
    UserManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserManagerRoutingModule
  ]
})
export class UserManagerModule {
}
