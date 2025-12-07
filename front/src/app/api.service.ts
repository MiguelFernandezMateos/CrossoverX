import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  sku: string;
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

export interface Team {
  id: number;
  name: string;
  city: string;
  logoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams`);
  }

  getProductsByTeam(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
}
