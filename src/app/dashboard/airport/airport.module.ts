import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AirPortComponent } from './airport.component';
import { AirPortRoutingModule } from './airport-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import { ClientAirportComponent } from './client-airport/client-airport.component';
import { AdminAirportComponent } from './admin-airport/admin-airport.component';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    AirPortComponent,
    ClientAirportComponent,
    AdminAirportComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirPortRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule
  ]
})
export class AirPortModule {
}
