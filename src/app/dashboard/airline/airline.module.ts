import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  AirlineComponent } from './airline.component';
import {  AirlineRoutingModule } from './airline-routing.module';


@NgModule({
  declarations: [
    AirlineComponent
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
