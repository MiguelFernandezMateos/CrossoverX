import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSelectedSubject = new Subject<Product>();
  public productSelected$ = this.productSelectedSubject.asObservable();

  selectProduct(product: Product) {
    this.productSelectedSubject.next(product);
  }
}
