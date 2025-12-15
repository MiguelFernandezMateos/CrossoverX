import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProductService, Product as ServiceProduct } from './product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Interfaz para representar un producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

// Interfaz para un artículo en el carrito (extiende Product con campos adicionales)
interface CartItem extends Product {
  qty: number; // Cantidad
  customName?: string; // Nombre personalizado del jugador
  playerNumber?: string; // Número de dorsal
  size?: string; // Talla seleccionada
}

// Interfaz para representar un usuario autenticado
interface User {
  email: string;
  isAdmin: boolean;
}

// Componente raíz de la aplicación
// Gestiona el catálogo de productos, carrito de compras, modales y autenticación
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit, OnDestroy {

  // Arreglo de productos disponibles en la tienda
  products: Product[] = [
    { id: 1, name: 'Camiseta ACB - FC Barcelona', price: 29.99, image: 'Barca.png', stock: 50 },
    { id: 2, name: 'Camiseta ACB - Real Madrid', price: 31.50, image: 'RealMadrid.png', stock: 35 },
    { id: 3, name: 'Camiseta ACB - Unicaja', price: 39.00, image: 'Unicaja.jpg', stock: 25 },
  ];

  // Arreglo de artículos en el carrito de compras
  cart: CartItem[] = [];

  // Flags para controlar la visibilidad de los modales
  productModalOpen = false; // Modal de detalles del producto
  cartModalOpen = false; // Modal del carrito de compras
  stockModalOpen = false; // Modal de gestión de stock (admin)
  showStockManagement = false;
  isShoppingView = true;
  isLoginPage = false;

  // Producto actualmente seleccionado para ver detalles
  selectedProduct: Product | null = null;
  
  // Usuario actualmente autenticado
  currentUser: User | null = null;

  // Campos para el modal de producto
  quantity = 1; // Cantidad a comprar
  customName = ''; // Nombre personalizado en la camiseta
  playerNumber = ''; // Número de dorsal
  selectedSize = ''; // Talla seleccionada
  stockEditing: { [key: number]: number } = {}; // Objeto para edición de stock por producto

  private destroy$ = new Subject<void>(); // Subject para desuscribirse de observables

  constructor(private router: Router, private productService: ProductService) {}

  // Inicialización del componente
  ngOnInit() {
    this.loadCurrentUser();

    // Escuchar cambios de ruta para recargar el usuario autenticado
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login' || event.url === '/inicio';
      // Recargar usuario después de navegar
      this.loadCurrentUser();
    });

    // Suscribirse a cambios de producto desde el servicio
    this.productService.productSelected$
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        console.log('Producto seleccionado:', product);
        this.openProduct(product);
      });
  }

  // Cargar el usuario autenticado desde localStorage
  loadCurrentUser() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
      } catch (e) {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
      }
    } else {
      this.currentUser = null;
    }
  }

  // Limpieza cuando se destruye el componente
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Navegar a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Navegar a la página principal (tienda)
  goToHome() {
    this.router.navigate(['']);
  }

  // Navegar al dashboard (solo admin)
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Cerrar sesión del usuario actual
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

  // Abrir el modal de gestión de stock (solo para admin)
  openStockModal() {
    if (this.currentUser?.isAdmin) {
      this.stockEditing = {};
      this.stockModalOpen = true;
    }
  }

  // Guardar cambios de stock (con soporte para dos casos de uso)
  // productId: Si se proporciona, guarda desde el modal de gestión de stock
  // Sin parámetro: Guarda desde el modal del producto individual
  saveStock(productId?: number) {
    if (productId !== undefined) {
      // Caso: guardar stock desde el modal de gestión de stock
      const newStock = this.stockEditing[productId];
      if (newStock !== undefined) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
          product.stock = newStock;
          delete this.stockEditing[productId];
          alert(`Stock actualizado a ${newStock} unidades`);
        }
      }
    } else {
      // Caso: guardar stock desde el modal del producto
      if (!this.selectedProduct || !this.currentUser?.isAdmin) return;
      
      const productIndex = this.products.findIndex(p => p.id === this.selectedProduct!.id);
      if (productIndex !== -1) {
        this.products[productIndex].stock = this.selectedProduct.stock;
        alert(`Stock actualizado a ${this.selectedProduct.stock} unidades`);
      }
    }
  }

  // Cerrar el modal de gestión de stock
  closeStockModal() {
    this.stockModalOpen = false;
  }

  // Abrir modal de detalles del producto
  openProduct(product: Product) {
    this.selectedProduct = product;
    // Reinicializar los campos del modal
    this.quantity = 1;
    this.customName = '';
    this.playerNumber = '';
    this.selectedSize = '';
    this.productModalOpen = true;
  }

  // Cerrar modal de detalles del producto
  closeProduct() {
    this.productModalOpen = false;
  }

  // Abrir modal del carrito de compras
  openCart() {
    this.cartModalOpen = true;
  }

  // Cerrar modal del carrito de compras
  closeCart() {
    this.cartModalOpen = false;
  }

  // Agregar producto al carrito con los detalles especificados
  addToCart() {
    if (!this.selectedProduct) return;

    // Buscar si el mismo producto con los mismos detalles ya existe en el carrito
    const existing = this.cart.find(
      i => i.id === this.selectedProduct!.id && 
           i.customName === this.customName &&
           i.playerNumber === this.playerNumber &&
           i.size === this.selectedSize
    );

    if (existing) {
      // Si existe, incrementar la cantidad
      existing.qty += this.quantity;
    } else {
      // Si no existe, crear un nuevo artículo en el carrito
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

  // Eliminar un artículo del carrito por índice
  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  // Vaciar completamente el carrito
  clearCart() {
    this.cart = [];
  }

  // Obtener la cantidad total de artículos en el carrito
  getTotalQuantity() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  // Calcular el precio total del carrito
  getTotal() {
    return this.cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  }

  // Procesar el checkout (simulado)
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
