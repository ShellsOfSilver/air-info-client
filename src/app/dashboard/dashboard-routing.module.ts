import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [ 
      {path: 'airline', loadChildren: './airline/airline.module#AirLineModule'},

      {path: 'airport', loadChildren: './airport/airport.module#AirPortModule'},

      {path: 'airplane', loadChildren: './airplane/airplane.module#AirPlaneModule'},

      {path: 'aircompany', loadChildren: './aircompany/aircompany.module#AirCompanyModule'},
  
      {path: 'user',
        loadChildren: './user-manager/user-manager.module#UserManagerModule', 
        canActivate: [AuthGuard]},
      {path: '', redirectTo: 'airline/view', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
}
