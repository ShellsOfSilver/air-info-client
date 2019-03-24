import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineComponent } from './airline.component'; 
import { AuthGuard } from '../auth.guard';
import { AdminAirlineComponent } from './admin-airline/admin-airline.component';
import { ClientAirlineComponent } from './client-airline/client-airline.component';

const routes: Routes = [
  {path: '', component: AirlineComponent, children: [ 
    {path: 'admin', component: AdminAirlineComponent, canActivate: [AuthGuard]},
    {path: 'view', component: ClientAirlineComponent},
    {path: ':id', component: ClientAirlineComponent},
  ]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlineRoutingModule { }
