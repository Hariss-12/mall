import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService, Shop } from '../services/shop.service';

interface MapState {
  selectedShop: Shop | null;
  hoveredShop: Shop | null;
  showDirections: boolean;
  zoomLevel: number;
  panX: number;
  panY: number;
}

@Component({
  selector: 'app-mall-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mall-map.component.html',
  styleUrl: './mall-map.component.css'
})
export class MallMapComponent implements OnInit {
  private shopService = inject(ShopService);

  shops = this.shopService.getShops();
  mapState = signal<MapState>({
    selectedShop: null,
    hoveredShop: null,
    showDirections: false,
    zoomLevel: 1,
    panX: 0,
    panY: 0,
  });

  userPosition = signal({ x: 450, y: 520 }); // "You Are Here" position - Main Entrance

  transformStyle = computed(() => {
    const state = this.mapState();
    return {
      transform: `translate(${state.panX}px, ${state.panY}px) scale(${state.zoomLevel})`,
      transformOrigin: 'center',
    };
  });

  ngOnInit() {
    // Auto-select first shop on load
    this.selectShop(this.shops()[0]);
  }

  selectShop(shop: Shop) {
    this.mapState.update(state => ({
      ...state,
      selectedShop: shop,
      showDirections: true,
    }));
  }

  hoverShop(shop: Shop | null) {
    this.mapState.update(state => ({
      ...state,
      hoveredShop: shop,
    }));
  }

  closeDetails() {
    this.mapState.update(state => ({
      ...state,
      selectedShop: null,
      showDirections: false,
    }));
  }

  navigateToShop() {
    if (this.selectedShop) {
      alert('🚀 Navigation Started to ' + this.selectedShop.name + '\n📍 Follow the glowing path on the map!');
      console.log('Navigating to:', this.selectedShop.name);
    }
  }

  zoomIn() {
    this.mapState.update(state => ({
      ...state,
      zoomLevel: Math.min(state.zoomLevel + 0.1, 3),
    }));
  }

  zoomOut() {
    this.mapState.update(state => ({
      ...state,
      zoomLevel: Math.max(state.zoomLevel - 0.1, 0.5),
    }));
  }

  resetZoom() {
    this.mapState.update(state => ({
      ...state,
      zoomLevel: 1,
      panX: 0,
      panY: 0,
    }));
  }

  get selectedShop() {
    return this.mapState().selectedShop;
  }

  get showDirections() {
    return this.mapState().showDirections;
  }
}
