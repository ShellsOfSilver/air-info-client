import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirPortComponent } from './airport.component';

const routes: Routes = [
  {path: '', component: AirPortComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirPortRoutingModule { }
