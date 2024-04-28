import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'pv-keyword-chart',
  standalone: true,
  imports: [],
  template: `
    <div>
      <canvas id="keywordChart"></canvas>
    </div>
  `,
  styles: [
    'canvas { background: white; padding: 1rem; border-radius: 0.5rem; }',
  ],
})
export class KeywordChartComponent implements OnChanges {
  @Input() keywordData: { keyword: string; count: number }[] = [];

  private chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['keywordData']) {
      this.updateChart();
    }
  }

  private initializeChart() {
    const ctx = document.getElementById('keywordChart') as HTMLCanvasElement;
    if (ctx) {
      Chart.register(...registerables);
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Occurrences in title or abstract',
              data: [],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Keyword Occurrences',
            },
          },
        },
      });
    }
  }

  private updateChart() {
    if (!this.chart) {
      this.initializeChart();
    }

    if (this.chart) {
      this.chart.data.labels = this.keywordData.map((item) => item.keyword);
      this.chart.data.datasets[0].data = this.keywordData.map(
        (item) => item.count
      );
      this.chart.update();
    }
  }
}
