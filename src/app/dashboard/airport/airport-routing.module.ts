import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirPortComponent } from './airport.component';
import { AuthGuard } from '../auth.guard';
import { AdminAirportComponent } from './admin-airport/admin-airport.component';
import { ClientAirportComponent } from './client-airport/client-airport.component';

const routes: Routes = [
  {path: '', component: AirPortComponent, children: [ 
    {path: 'admin', component: AdminAirportComponent, canActivate: [AuthGuard]},
    {path: ':id', component: ClientAirportComponent},
    {path: 'view', component: ClientAirportComponent},
  ]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirPortRoutingModule { }
