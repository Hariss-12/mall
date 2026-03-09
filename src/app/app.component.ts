import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './components/dashboard-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'myapp';
}
