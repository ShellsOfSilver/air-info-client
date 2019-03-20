import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirPlaneComponent } from './airplane.component';

const routes: Routes = [
  {path: '', component: AirPlaneComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirPlaneRoutingModule { }
