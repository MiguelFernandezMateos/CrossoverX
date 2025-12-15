import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para un producto de la tienda
export interface Product {
  id: number;
  name: string;
  sku: string; // Código SKU del producto
  price: number;
  stock: number;
  imageUrl: string;
  team: {
    id: number;
    name: string;
    city: string;
    logoUrl: string;
  };
  size: {
    id: number;
    code: string;
  };
}

// Interfaz para un equipo de baloncesto
export interface Team {
  id: number;
  name: string;
  city: string;
  logoUrl: string;
}

// Servicio para comunicación con la API backend
// Maneja todas las peticiones HTTP a los endpoints del servidor
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL base de la API backend
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Obtener la lista completa de productos desde la API
  // Retorna un Observable con el arreglo de productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  // Obtener la lista de todos los equipos de baloncesto
  // Retorna un Observable con el arreglo de equipos
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams`);
  }

  // Obtener productos agrupados por equipo
  // Retorna un Observable con datos de productos por equipo
  getProductsByTeam(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
}
