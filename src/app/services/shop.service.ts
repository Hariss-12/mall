import { Injectable } from '@angular/core';
import { Signal, signal } from '@angular/core';

export interface Shop {
  id: string;
  name: string;
  category: string;
  floor: number;
  x: number;
  y: number;
  description: string;
  icon: string;
}

export interface Direction {
  steps: string[];
  distance: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private shops = signal<Shop[]>([
    // Left corridor shops
    { id: 'shop1', name: 'Nike Store', category: 'Sports', floor: 0, x: 150, y: 200, description: 'Athletic gear and footwear', icon: '👟' },
    { id: 'shop2', name: 'Fashion Hub', category: 'Clothing', floor: 0, x: 150, y: 280, description: 'Latest fashion trends', icon: '👗' },
    { id: 'shop3', name: 'Tech Zone', category: 'Electronics', floor: 0, x: 150, y: 360, description: 'Latest gadgets & tech', icon: '📱' },
    { id: 'shop4', name: 'Coffee House', category: 'Food Court', floor: 0, x: 150, y: 440, description: 'Premium coffee & snacks', icon: '☕' },
    
    // Right corridor shops
    { id: 'shop5', name: 'Beauty Bytes', category: 'Beauty', floor: 0, x: 750, y: 200, description: 'Cosmetics & skincare', icon: '💄' },
    { id: 'shop6', name: 'Books & More', category: 'Books', floor: 0, x: 750, y: 280, description: 'Large book collection', icon: '📚' },
    { id: 'shop7', name: 'Pizza Palace', category: 'Restaurant', floor: 0, x: 750, y: 360, description: 'Italian cuisine', icon: '🍕' },
    { id: 'shop8', name: 'Jewelry Co.', category: 'Accessories', floor: 0, x: 750, y: 440, description: 'Fine jewelry collection', icon: '💎' },
    
    // Theatre area
    { id: 'theatre', name: 'Grand Cinema', category: 'Cinema', floor: 1, x: 450, y: 120, description: '4K screens & luxury seating', icon: '🎬' },
    
    // Food court
    { id: 'foodcourt', name: 'Food Court', category: 'Food Court', floor: 0, x: 450, y: 380, description: 'Multiple dining options', icon: '🍔' },
  ]);

  getShops(): Signal<Shop[]> {
    return this.shops;
  }

  getShopById(id: string): Shop | undefined {
    return this.shops().find(shop => shop.id === id);
  }

  getDirections(fromId: string, toId: string): Direction {
    const fromShop = this.getShopById(fromId);
    const toShop = this.getShopById(toId);

    if (!fromShop || !toShop) {
      return { steps: [], distance: '0' };
    }

    const dx = toShop.x - fromShop.x;
    const dy = toShop.y - fromShop.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const steps = this.generateSteps(fromShop, toShop);

    return {
      steps,
      distance: `${(distance / 50).toFixed(1)} units`
    };
  }

  private generateSteps(from: Shop, to: Shop): string[] {
    const steps: string[] = [];

    if (from.x < 400 && to.x < 400) {
      steps.push(`Walk forward along the left corridor towards ${to.name}`);
    } else if (from.x > 400 && to.x > 400) {
      steps.push(`Walk forward along the right corridor towards ${to.name}`);
    } else {
      steps.push(`Head towards the central atrium`);
      steps.push(`Cross the atrium towards the ${to.x < 400 ? 'left' : 'right'} corridor`);
    }

    if (from.floor !== to.floor) {
      steps.push(`Take the elevator to floor ${to.floor}`);
    }

    steps.push(`Look for the ${to.name} store and entrance`);
    steps.push(`You have arrived at your destination!`);

    return steps;
  }
}
