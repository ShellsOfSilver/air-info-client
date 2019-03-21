import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirPlaneComponent } from './airplane.component';
import { AuthGuard } from '../auth.guard';
import { AdminAirplaneComponent } from './admin-airplane/admin-airplane.component';
import { ClientAirplaneComponent } from './client-airplane/client-airplane.component';

const routes: Routes = [
  {path: '', component: AirPlaneComponent, children: [ 
    {path: 'admin', component: AdminAirplaneComponent, canActivate: [AuthGuard]},
    {path: 'view', component: ClientAirplaneComponent},
  ]} 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirPlaneRoutingModule { }
