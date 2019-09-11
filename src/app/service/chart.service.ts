import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  lineConfigTemplate = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [
          'rgba(5, 255, 163, .2)'
        ],
        borderColor: [
          'rgba(32, 150, 255, .7)',
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      hover: {
        mode: 'index',
        intersect: true
      }
    }
  };

  getLineChartConfig(labels: Array<any>, data: Array<any>) {
    const config = this.lineConfigTemplate;
    config.data.labels = labels;
    config.data.datasets[0].data = data;
    return config;
  }

  constructor() { }
}
