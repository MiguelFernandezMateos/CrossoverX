import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  isLoggedIn = false;
  currentUser: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      this.isLoggedIn = true;
    }
  }

  login() {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    let user: User | null = null;

    if (this.email === 'admin' && this.password === 'admin') {
      user = { email: 'admin', isAdmin: true };
    } else if (this.email && this.email.includes('@')) {
      user = { email: this.email, isAdmin: false };
    }

    if (user) {
      this.currentUser = user;
      this.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.password = '';
    }
  }

  loginWithGoogle() {
    const user: User = { email: 'usuario@gmail.com', isAdmin: false };
    this.currentUser = user;
    this.isLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    localStorage.removeItem('currentUser');
  }

  goToDashboard() {
    if (this.currentUser?.isAdmin) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/tienda']);
    }
  }
}
