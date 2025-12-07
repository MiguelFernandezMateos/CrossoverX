import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProductService, Product as ServiceProduct } from './product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

interface CartItem extends Product {
  qty: number;
  customName?: string;
  playerNumber?: string;
  size?: string;
}

interface User {
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {

  products: Product[] = [
    { id: 1, name: 'Camiseta ACB - FC Barcelona', price: 29.99, image: 'Barca.png', stock: 50 },
    { id: 2, name: 'Camiseta ACB - Real Madrid', price: 31.50, image: 'RealMadrid.png', stock: 35 },
    { id: 3, name: 'Camiseta ACB - Unicaja', price: 39.00, image: 'Unicaja.jpg', stock: 25 },
  ];

  cart: CartItem[] = [];

  productModalOpen = false;
  cartModalOpen = false;
  stockModalOpen = false;
  showStockManagement = false;
  isShoppingView = true;
  isLoginPage = false;

  selectedProduct: Product | null = null;
  currentUser: User | null = null;

  quantity = 1;
  customName = '';
  playerNumber = '';
  selectedSize = '';
  stockEditing: { [key: number]: number } = {};

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      this.showStockManagement = this.currentUser?.isAdmin ?? false;
    }

    // Detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login' || event.url === '/inicio';
    });

    // Suscribirse a cambios de producto
    this.productService.productSelected$
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        console.log('Producto seleccionado:', product);
        this.openProduct(product);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.currentUser = null;
    this.showStockManagement = false;
    localStorage.removeItem('currentUser');
  }

  openStockModal() {
    if (this.currentUser?.isAdmin) {
      this.stockEditing = {};
      this.stockModalOpen = true;
    }
  }

  closeStockModal() {
    this.stockModalOpen = false;
  }

  updateStock(productId: number, newStock: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
    }
  }

  saveStock(productId: number) {
    const newStock = this.stockEditing[productId];
    if (newStock !== undefined) {
      this.updateStock(productId, newStock);
      delete this.stockEditing[productId];
    }
  }

  openProduct(product: Product) {
    this.selectedProduct = product;
    this.quantity = 1;
    this.customName = '';
    this.playerNumber = '';
    this.selectedSize = '';
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
      i => i.id === this.selectedProduct!.id && 
           i.customName === this.customName &&
           i.playerNumber === this.playerNumber &&
           i.size === this.selectedSize
    );

    if (existing) {
      existing.qty += this.quantity;
    } else {
      this.cart.push({
        ...this.selectedProduct,
        qty: this.quantity,
        customName: this.customName || '',
        playerNumber: this.playerNumber || '',
        size: this.selectedSize || ''
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
