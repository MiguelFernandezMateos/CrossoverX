import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Interfaz para representar un producto en el servicio
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number; // Stock opcional del producto
}

// Servicio para manejar eventos de selección de productos
// Utiliza RxJS Subject para comunicación reactiva entre componentes
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Subject privado para emitir eventos de producto seleccionado
  private productSelectedSubject = new Subject<Product>();
  
  // Observable público que otros componentes pueden suscribirse
  public productSelected$ = this.productSelectedSubject.asObservable();

  // Emitir un evento cuando se selecciona un producto
  // Este método es llamado cuando el usuario hace clic en un producto
  selectProduct(product: Product) {
    this.productSelectedSubject.next(product);
  }
}
