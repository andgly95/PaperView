import {
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
    'div { min-height: 300px; width: 100%; }; canvas { background: white; padding: 16px; border-radius: 10px; }',
  ],
})
export class KeywordChartComponent implements OnChanges {
  @Input() keywordData: { keyword: string; count: number }[] = [];
  @Input() selectedPaperKeywordData: { keyword: string; count: number }[] = [];
  private chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['keywordData'] || changes['selectedPaperKeywordData']) {
      this.updateChart();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.chart) {
      this.chart.resize(0);
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
              label: 'Occurrences in all papers',
              data: [],
              borderColor: '#f5a623',
              backgroundColor: '#f5a62320',
              borderWidth: 1,
            },
            {
              label: 'Occurrences in selected paper',
              data: [],
              borderColor: '#1d3149',
              backgroundColor: '#1d314920',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
      this.chart.data.datasets[1].data = this.selectedPaperKeywordData.map(
        (item) => item.count
      );
      this.chart.update();
    }
  }
}
