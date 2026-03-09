import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { MallMapComponent } from './mall-map/mall-map.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'map', component: MallMapComponent },
      // You can add a default child route here if needed:
      // { path: '', redirectTo: 'map', pathMatch: 'full' }
    ]
  },
  // Catch-all for 404s or redirects can go here
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}