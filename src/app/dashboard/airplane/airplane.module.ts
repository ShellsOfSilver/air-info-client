import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AirPlaneComponent } from './airplane.component';
import { AirPlaneRoutingModule } from './airplane-routing.module';


@NgModule({
  declarations: [
    AirPlaneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirPlaneRoutingModule
  ]
})
export class AirPlaneModule {
}
