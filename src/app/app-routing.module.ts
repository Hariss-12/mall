import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { MallMapComponent } from './mall-map/mall-map.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent },
  { path: 'map', component: MallMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }