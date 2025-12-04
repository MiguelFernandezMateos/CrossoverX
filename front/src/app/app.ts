import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  qty: number;
  customName?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  products: Product[] = [
    { id: 1, name: 'Camiseta ACB - Local', price: 29.99, image: 'https://via.placeholder.com/300x300.png?text=Local' },
    { id: 2, name: 'Camiseta ACB - Visitante', price: 31.50, image: 'https://via.placeholder.com/300x300.png?text=Visitante' },
    { id: 3, name: 'Camiseta ACB - Ed. Especial', price: 39.00, image: 'https://via.placeholder.com/300x300.png?text=Especial' },
  ];

  cart: CartItem[] = [];

  productModalOpen = false;
  cartModalOpen = false;

  selectedProduct: Product | null = null;

  quantity = 1;
  customName = '';

  openProduct(product: Product) {
    this.selectedProduct = product;
    this.quantity = 1;
    this.customName = '';
    this.productModalOpen = true;
  }

  closeProduct() {
    this.productModalOpen = false;
  }

  openCart() {
    this.cartModalOpen = true;
  }

  closeCart() {
    this.cartModalOpen = false;
  }

  addToCart() {
    if (!this.selectedProduct) return;

    const existing = this.cart.find(
      i => i.id === this.selectedProduct!.id && i.customName === this.customName
    );

    if (existing) {
      existing.qty += this.quantity;
    } else {
      this.cart.push({
        ...this.selectedProduct,
        qty: this.quantity,
        customName: this.customName || ''
      });
    }

    this.closeProduct();
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
  }

  getTotalQuantity() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  getTotal() {
    return this.cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  }

  checkout() {
    if (this.cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('¡Compra realizada con éxito! (simulado)');
    this.clearCart();
    this.closeCart();
  }
}
