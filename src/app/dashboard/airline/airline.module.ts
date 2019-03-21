import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  AirlineComponent } from './airline.component';
import {  AirlineRoutingModule } from './airline-routing.module';
import { AdminAirlineComponent } from './admin-airline/admin-airline.component';
import { ClientAirlineComponent } from './client-airline/client-airline.component';


@NgModule({
  declarations: [
    AirlineComponent,
    AdminAirlineComponent,
    ClientAirlineComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirlineRoutingModule
  ]
})
export class AirLineModule {
}
