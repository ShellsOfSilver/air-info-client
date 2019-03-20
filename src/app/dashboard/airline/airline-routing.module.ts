import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineComponent } from './airline.component'; 

const routes: Routes = [
  {path: '', component: AirlineComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlineRoutingModule { }
