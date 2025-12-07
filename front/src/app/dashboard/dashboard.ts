import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, Product } from '../api.service';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  products: Product[] = [];
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

  loading = true;
  error = '';

  // Para el gráfico de barras
  teamStatsData: { teamName: string; wins: number }[] = [];
  chartLabels: string[] = [];
  chartValues: number[] = [];
  maxWins = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

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

  processDataForChart() {
    // Calcular victorias de los equipos basándose en los partidos simulados
    const teamWinsMap: { [key: string]: number } = {};

    this.mockMatches.forEach(match => {
      if (!teamWinsMap[match.homeTeam]) {
        teamWinsMap[match.homeTeam] = 0;
      }
      if (!teamWinsMap[match.awayTeam]) {
        teamWinsMap[match.awayTeam] = 0;
      }

      if (match.homeScore > match.awayScore) {
        teamWinsMap[match.homeTeam]++;
      } else if (match.awayScore > match.homeScore) {
        teamWinsMap[match.awayTeam]++;
      }
    });

    this.teamStatsData = Object.entries(teamWinsMap)
      .map(([name, wins]) => ({
        teamName: name,
        wins: wins
      }))
      .sort((a, b) => b.wins - a.wins);

    this.chartLabels = this.teamStatsData.map(t => t.teamName);
    this.chartValues = this.teamStatsData.map(t => t.wins);
    this.maxWins = Math.max(...this.chartValues, 1);
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  getTotalStock(): number {
    return this.products.reduce((sum, p) => sum + p.stock, 0);
  }

  getAveragePrice(): number {
    if (this.products.length === 0) return 0;
    return this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length;
  }

  getTotalMatches(): number {
    return this.mockMatches.length;
  }

  getTotalTeams(): number {
    const teams = new Set<string>();
    this.mockMatches.forEach(match => {
      teams.add(match.homeTeam);
      teams.add(match.awayTeam);
    });
    return teams.size;
  }

  getLeaderTeam(): string {
    return this.teamStatsData.length > 0 ? this.teamStatsData[0].teamName : 'N/A';
  }

  getLeaderWins(): number {
    return this.teamStatsData.length > 0 ? this.teamStatsData[0].wins : 0;
  }
}
