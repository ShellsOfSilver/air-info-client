import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [ 
      {path: 'airline', loadChildren: './airline/airline.module#AirLineModule'},
      {path: 'm_airline', loadChildren: './airline/airline.module#AirLineModule', canActivate: [AuthGuard]},

      {path: 'airport', loadChildren: './airport/airport.module#AirPortModule'},
      {path: 'm_airport', loadChildren: './airport/airport.module#AirPortModule', canActivate: [AuthGuard]},

      {path: 'airplane', loadChildren: './airplane/airplane.module#AirPlaneModule'},
      {path: 'm_airplane', loadChildren: './airplane/airplane.module#AirPlaneModule', canActivate: [AuthGuard]},
      
      {path: 'aircompany', loadChildren: './aircompany/aircompany.module#AirCompanyModule'},
      {path: 'm_aircompany', loadChildren: './aircompany/aircompany.module#AirCompanyModule', canActivate: [AuthGuard]},
  
      {path: 'm_user',
        loadChildren: './user-manager/user-manager.module#UserManagerModule', 
        canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
}
