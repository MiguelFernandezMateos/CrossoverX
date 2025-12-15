import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, Product } from '../api.service';

// Interfaz para representar un partido de baloncesto
interface Match {
  id: number;
  homeTeam: string; // Equipo local
  awayTeam: string; // Equipo visitante
  homeScore: number; // Puntuación del equipo local
  awayScore: number; // Puntuación del equipo visitante
  date: string; // Fecha del partido
}

// Componente del dashboard de administración
// Muestra estadísticas de productos y partidos simulados
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // Arreglo de productos cargados desde la API
  products: Product[] = [];
  
  // Datos simulados de partidos de ACB (Liga de baloncesto española)
  mockMatches: Match[] = [
    { id: 1, homeTeam: 'Real Madrid', awayTeam: 'FC Barcelona', homeScore: 85, awayScore: 78, date: '2024-12-05' },
    { id: 2, homeTeam: 'Valencia Basket', awayTeam: 'Baskonia', homeScore: 92, awayScore: 88, date: '2024-12-04' },
    { id: 3, homeTeam: 'Joventut', awayTeam: 'Real Madrid', homeScore: 75, awayScore: 95, date: '2024-12-03' },
    { id: 4, homeTeam: 'Unicaja Málaga', awayTeam: 'Valencia Basket', homeScore: 80, awayScore: 82, date: '2024-12-02' },
    { id: 5, homeTeam: 'FC Barcelona', awayTeam: 'Lenovo Tenerife', homeScore: 98, awayScore: 85, date: '2024-12-01' },
    { id: 6, homeTeam: 'Baskonia', awayTeam: 'Joventut', homeScore: 87, awayScore: 79, date: '2024-11-30' },
    { id: 7, homeTeam: 'Real Madrid', awayTeam: 'Unicaja Málaga', homeScore: 101, awayScore: 88, date: '2024-11-29' },
    { id: 8, homeTeam: 'Valencia Basket', awayTeam: 'FC Barcelona', homeScore: 89, awayScore: 91, date: '2024-11-28' },
  ];

  loading = true; // Flag para indicar si se está cargando
  error = ''; // Mensaje de error si algo falla

  // Datos procesados para mostrar en el gráfico de barras
  teamStatsData: { teamName: string; wins: number }[] = [];
  chartLabels: string[] = []; // Nombres de los equipos
  chartValues: number[] = []; // Número de victorias por equipo
  maxWins = 0; // Número máximo de victorias (para escalar el gráfico)

  constructor(private apiService: ApiService) {}

  // Inicialización del componente
  ngOnInit() {
    this.loadData();
  }

  // Cargar productos desde la API y procesar datos
  loadData() {
    this.loading = true;
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.processDataForChart();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
        this.error = 'Error al cargar los productos de la API';
        this.loading = false;
      }
    });
  }

  // Procesar datos de partidos para generar estadísticas de equipos
  // Calcula las victorias de cada equipo basándose en los partidos simulados
  processDataForChart() {
    // Mapa para contar victorias por equipo
    const teamWinsMap: { [key: string]: number } = {};

    // Iterar sobre los partidos y contar victorias
    this.mockMatches.forEach(match => {
      if (!teamWinsMap[match.homeTeam]) {
        teamWinsMap[match.homeTeam] = 0;
      }
      if (!teamWinsMap[match.awayTeam]) {
        teamWinsMap[match.awayTeam] = 0;
      }

      // Incrementar el contador de victorias del equipo ganador
      if (match.homeScore > match.awayScore) {
        teamWinsMap[match.homeTeam]++;
      } else if (match.awayScore > match.homeScore) {
        teamWinsMap[match.awayTeam]++;
      }
    });

    // Convertir el mapa a un arreglo ordenado por victorias (descendente)
    this.teamStatsData = Object.entries(teamWinsMap)
      .map(([name, wins]) => ({
        teamName: name,
        wins: wins
      }))
      .sort((a, b) => b.wins - a.wins);

    // Extraer etiquetas y valores para el gráfico
    this.chartLabels = this.teamStatsData.map(t => t.teamName);
    this.chartValues = this.teamStatsData.map(t => t.wins);
    this.maxWins = Math.max(...this.chartValues, 1);
  }

  // Obtener el número total de productos
  getTotalProducts(): number {
    return this.products.length;
  }

  // Obtener el stock total disponible de todos los productos
  getTotalStock(): number {
    return this.products.reduce((sum, p) => sum + p.stock, 0);
  }

  // Calcular el precio promedio de los productos
  getAveragePrice(): number {
    if (this.products.length === 0) return 0;
    return this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length;
  }

  // Obtener el número total de partidos en los datos simulados
  getTotalMatches(): number {
    return this.mockMatches.length;
  }

  // Obtener el número de equipos únicos que han jugado
  getTotalTeams(): number {
    const teams = new Set<string>();
    this.mockMatches.forEach(match => {
      teams.add(match.homeTeam);
      teams.add(match.awayTeam);
    });
    return teams.size;
  }

  // Obtener el nombre del equipo con más victorias
  getLeaderTeam(): string {
    return this.teamStatsData.length > 0 ? this.teamStatsData[0].teamName : 'N/A';
  }

  // Obtener el número de victorias del equipo líder
  getLeaderWins(): number {
    return this.teamStatsData.length > 0 ? this.teamStatsData[0].wins : 0;
  }
}
