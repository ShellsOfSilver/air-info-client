import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AirCompanyComponent } from './aircompany.component';
import { AirCompanyRoutingModule } from './aircompany-routing.module';


@NgModule({
  declarations: [
    AirCompanyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirCompanyRoutingModule
  ]
})
export class AirCompanyModule {
}
