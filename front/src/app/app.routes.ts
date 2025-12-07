import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { Inicio } from './inicio/inicio';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: TiendaComponent },
  { path: 'login', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'dashboard', component: Dashboard },
  { path: '**', redirectTo: '' }
];
