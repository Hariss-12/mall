import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeMenu = signal('map');
  menuSelected = output<string>();

  menuItems: MenuItem[] = [
    { id: 'map', label: 'Map', icon: '🗺️', description: 'View full mall map' },
    { id: 'stores', label: 'Find Store', icon: '🏪', description: 'Search for stores' },
    { id: 'food', label: 'Food Court', icon: '🍽️', description: 'Dining options' },
    { id: 'cinema', label: 'Cinema', icon: '🎬', description: 'Movie theatres' },
    { id: 'shops', label: 'Shops', icon: '🛍️', description: 'All retailers' },
    { id: 'restrooms', label: 'Restrooms', icon: '🚻', description: 'Facilities' },
    { id: 'parking', label: 'Parking', icon: '🅿️', description: 'Parking info' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'App settings' },
  ];

  selectMenu(id: string) {
    this.activeMenu.set(id);
    this.menuSelected.emit(id);
    const item = this.menuItems.find(m => m.id === id);
    if (item) {
      console.log('Menu selected:', item.label);
      alert('📌 ' + item.label + ' selected: ' + item.description);
    }
  }
}
