import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { MallMapComponent } from './mall-map/mall-map.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    MallMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }