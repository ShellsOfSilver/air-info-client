import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserManagerComponent } from './user-manager.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    UserManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserManagerRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
  ]
})
export class UserManagerModule {
}
