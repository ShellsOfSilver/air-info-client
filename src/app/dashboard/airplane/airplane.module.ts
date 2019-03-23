import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { AirPlaneComponent } from './airplane.component';
import { AirPlaneRoutingModule } from './airplane-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AdminAirplaneComponent } from './admin-airplane/admin-airplane.component';
import { ClientAirplaneComponent } from './client-airplane/client-airplane.component';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    AirPlaneComponent,
    AdminAirplaneComponent,
    ClientAirplaneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirPlaneRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    ToastModule
  ]
})
export class AirPlaneModule {
}
