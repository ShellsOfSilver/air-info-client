import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AirPortComponent } from './airport.component';
import { AirPortRoutingModule } from './airport-routing.module';


@NgModule({
  declarations: [
    AirPortComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirPortRoutingModule
  ]
})
export class AirPortModule {
}
