import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  AirlineComponent } from './airline.component';
import {  AirlineRoutingModule } from './airline-routing.module';
import { AdminAirlineComponent } from './admin-airline/admin-airline.component';
import { ClientAirlineComponent } from './client-airline/client-airline.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';

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
    AirlineRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule,
  ]
})
export class AirLineModule {
}
