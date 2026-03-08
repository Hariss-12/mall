import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery = signal('');
  notificationCount = signal(3);
  showNotifications = signal(false);
  showProfile = signal(false);

  onSearchInput(event: any) {
    this.searchQuery.set(event.target?.value || '');
  }

  onSearch() {
    if (this.searchQuery()) {
      console.log('Searching for:', this.searchQuery());
      alert('🔍 Search: ' + this.searchQuery());
    }
  }

  openMap() {
    console.log('Opening map view');
    alert('🗺️ Map View Opened');
  }

  getDirections() {
    console.log('Getting directions');
    alert('🧭 Directions Mode Activated');
  }

  toggleNotifications() {
    this.showNotifications.update(v => !v);
    if (this.showNotifications()) {
      alert('🔔 You have ' + this.notificationCount() + ' new notifications');
    }
  }

  toggleProfile() {
    this.showProfile.update(v => !v);
    if (this.showProfile()) {
      alert('👤 Profile: Guest User');
    }
  }
}
