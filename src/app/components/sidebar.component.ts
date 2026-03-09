import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  category?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
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
  expandedCategories = signal<Set<string>>(new Set(['Navigation']));

  menuCategories: MenuCategory[] = [
    {
      name: 'Navigation',
      items: [
        { id: 'map', label: 'Map', icon: '🗺️', description: 'View full mall map', category: 'Navigation' },
        { id: 'directions', label: 'Directions', icon: '🧭', description: 'Get directions', category: 'Navigation' },
      ]
    },
    {
      name: 'Shopping',
      items: [
        { id: 'stores', label: 'Find Store', icon: '🏪', description: 'Search for stores', category: 'Shopping' },
        { id: 'shops', label: 'All Shops', icon: '🛍️', description: 'Browse retailers', category: 'Shopping' },
      ]
    },
    {
      name: 'Dining & Entertainment',
      items: [
        { id: 'food', label: 'Food Court', icon: '🍽️', description: 'Dining options', category: 'Dining & Entertainment' },
        { id: 'cinema', label: 'Cinema', icon: '🎬', description: 'Movie theatres', category: 'Dining & Entertainment' },
      ]
    },
    {
      name: 'Facilities',
      items: [
        { id: 'restrooms', label: 'Restrooms', icon: '🚻', description: 'Facilities', category: 'Facilities' },
        { id: 'parking', label: 'Parking', icon: '🅿️', description: 'Parking info', category: 'Facilities' },
        { id: 'info', label: 'Info Center', icon: 'ℹ️', description: 'Help & Information', category: 'Facilities' },
      ]
    },
    {
      name: 'Settings',
      items: [
        { id: 'settings', label: 'Settings', icon: '⚙️', description: 'App preferences', category: 'Settings' },
      ]
    }
  ];

  selectMenu(id: string) {
    this.activeMenu.set(id);
    this.menuSelected.emit(id);
    const item = this.menuCategories
      .flatMap(cat => cat.items)
      .find(m => m.id === id);
    if (item) {
      console.log('Menu selected:', item.label);
      alert('📌 ' + item.label + ' selected: ' + item.description);
    }
  }

  toggleCategory(categoryName: string) {
    const expanded = new Set(this.expandedCategories());
    if (expanded.has(categoryName)) {
      expanded.delete(categoryName);
    } else {
      expanded.add(categoryName);
    }
    this.expandedCategories.set(expanded);
  }

  isCategoryExpanded(categoryName: string): boolean {
    return this.expandedCategories().has(categoryName);
  }
}
