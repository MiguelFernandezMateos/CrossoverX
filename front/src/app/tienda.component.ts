import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="max-w-6xl mx-auto py-8 px-4">
      <h2 class="text-xl font-semibold mb-6 text-gray-700">Camisetas ACB</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition" (click)="openProduct({id: 1, name: 'Camiseta ACB - FC Barcelona', price: 29.99, image: 'Barca.png', stock: 50})">
          <img src="Barca.png" alt="Camiseta ACB - FC Barcelona" class="w-40 h-40 object-contain mb-3 rounded mx-auto">
          <h4 class="font-bold text-lg text-gray-800 mb-1">Camiseta ACB - FC Barcelona</h4>
          <span class="text-blue-700 font-semibold mb-3 block">29.99 €</span>
          <button class="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
            (click)="$event.stopPropagation(); openProduct({id: 1, name: 'Camiseta ACB - FC Barcelona', price: 29.99, image: 'Barca.png', stock: 50})">Ver detalles</button>
        </div>

        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition" (click)="openProduct({id: 2, name: 'Camiseta ACB - Real Madrid', price: 31.50, image: 'RealMadrid.png', stock: 35})">
          <img src="RealMadrid.png" alt="Camiseta ACB - Real Madrid" class="w-40 h-40 object-contain mb-3 rounded mx-auto">
          <h4 class="font-bold text-lg text-gray-800 mb-1">Camiseta ACB - Real Madrid</h4>
          <span class="text-blue-700 font-semibold mb-3 block">31.50 €</span>
          <button class="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
            (click)="$event.stopPropagation(); openProduct({id: 2, name: 'Camiseta ACB - Real Madrid', price: 31.50, image: 'RealMadrid.png', stock: 35})">Ver detalles</button>
        </div>

        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition" (click)="openProduct({id: 3, name: 'Camiseta ACB - Unicaja', price: 39.00, image: 'Unicaja.jpg', stock: 25})">
          <img src="Unicaja.jpg" alt="Camiseta ACB - Unicaja" class="w-40 h-40 object-contain mb-3 rounded mx-auto">
          <h4 class="font-bold text-lg text-gray-800 mb-1">Camiseta ACB - Unicaja</h4>
          <span class="text-blue-700 font-semibold mb-3 block">39.00 €</span>
          <button class="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
            (click)="$event.stopPropagation(); openProduct({id: 3, name: 'Camiseta ACB - Unicaja', price: 39.00, image: 'Unicaja.jpg', stock: 25})">Ver detalles</button>
        </div>
      </div>
    </main>
  `
})
export class TiendaComponent {
  constructor(private productService: ProductService) {}

  openProduct(product: Product) {
    console.log('openProduct llamado con:', product);
    this.productService.selectProduct(product);
  }
}
