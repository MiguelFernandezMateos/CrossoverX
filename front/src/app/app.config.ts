import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Configuración global de la aplicación Angular
// Define los providers que se inyectarán en toda la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de detección de cambios: coalescencia de eventos
    // Mejora el rendimiento agrupando múltiples eventos
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Proveedor del sistema de rutas con las rutas definidas
    provideRouter(routes),
    
    // Proveedor del cliente HTTP para realizar peticiones a la API
    provideHttpClient()
  ]
};

