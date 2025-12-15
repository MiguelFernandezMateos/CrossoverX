import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Interfaz para representar un usuario autenticado
interface User {
  email: string;
  isAdmin: boolean;
}

// Componente de inicio de sesión (login)
// Maneja la autenticación de usuarios y creación de sesiones
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  email = ''; // Email ingresado por el usuario
  password = ''; // Contraseña ingresada por el usuario
  errorMessage = ''; // Mensaje de error si el login falla
  isLoggedIn = false; // Indica si el usuario está autenticado
  currentUser: User | null = null; // Usuario actualmente autenticado

  constructor(private router: Router) {}

  // Inicialización del componente
  ngOnInit() {
    // Verificar si hay una sesión activa en localStorage
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      this.isLoggedIn = true;
    }
  }

  // Procesar el login del usuario
  // Valida credenciales y crea la sesión
  login() {
    this.errorMessage = '';
    
    // Validar que los campos no estén vacíos
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    let user: User | null = null;

    // Validar credenciales: admin/admin para administrador
    if (this.email === 'admin' && this.password === 'admin') {
      user = { email: 'admin', isAdmin: true };
    } else if (this.email && this.email.includes('@')) {
      // Cualquier email válido crea un usuario regular
      user = { email: this.email, isAdmin: false };
    }

    if (user) {
      this.currentUser = user;
      this.isLoggedIn = true;
      // Guardar la sesión en localStorage para persistencia
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Redirigir a la tienda después del login
      this.router.navigate(['/']);
    } else {
      // Mostrar error si las credenciales son inválidas
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.password = '';
    }
  }

  // Login simulado con Google
  // Crea un usuario regular sin permisos de admin
  loginWithGoogle() {
    const user: User = { email: 'usuario@gmail.com', isAdmin: false };
    this.currentUser = user;
    this.isLoggedIn = true;
    // Guardar la sesión en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Redirigir a la tienda después del login
    this.router.navigate(['/']);
  }

  // Cerrar la sesión actual
  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    // Eliminar la sesión de localStorage
    localStorage.removeItem('currentUser');
  }

  // Navegar al dashboard (solo para admin) o a la tienda (usuario regular)
  goToDashboard() {
    if (this.currentUser?.isAdmin) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
