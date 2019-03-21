import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirCompanyComponent } from './aircompany.component'
import { AuthGuard } from '../auth.guard';
import { AdminAircompanyComponent } from './admin-aircompany/admin-aircompany.component';
import { ClientAircompanyComponent } from './client-aircompany/client-aircompany.component';

const routes: Routes = [
  {path: '', component: AirCompanyComponent, children: [ 
    {path: 'admin', component: AdminAircompanyComponent, canActivate: [AuthGuard]},
    {path: 'view', component: ClientAircompanyComponent},
  ]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirCompanyRoutingModule { }
