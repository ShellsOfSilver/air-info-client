import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AirCompanyComponent } from './aircompany.component';
import { AirCompanyRoutingModule } from './aircompany-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {MultiSelectModule} from 'primeng/multiselect';
import { ClientAircompanyComponent } from './client-aircompany/client-aircompany.component';
import { AdminAircompanyComponent } from './admin-aircompany/admin-aircompany.component';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AirCompanyComponent,
    ClientAircompanyComponent,
    AdminAircompanyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AirCompanyRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    MultiSelectModule,
    ToastModule
  ]
})
export class AirCompanyModule {
}
