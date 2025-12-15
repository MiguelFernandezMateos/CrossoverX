import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { Inicio } from './inicio/inicio';
import { Dashboard } from './dashboard/dashboard';

// Definición de las rutas de la aplicación
// Especifica qué componente se carga para cada ruta
export const routes: Routes = [
  // Ruta raíz: carga la tienda (catálogo de productos)
  { path: '', component: TiendaComponent },
  
  // Ruta de login (alias 'login' para la ruta de autenticación)
  { path: 'login', component: Inicio },
  
  // Ruta de inicio (alias 'inicio' para la ruta de autenticación)
  { path: 'inicio', component: Inicio },
  
  // Ruta del dashboard (panel de administración con estadísticas)
  // Solo accesible para usuarios admin
  { path: 'dashboard', component: Dashboard },
  
  // Ruta comodín: redirige cualquier ruta no definida a la raíz
  { path: '**', redirectTo: '' }
];
