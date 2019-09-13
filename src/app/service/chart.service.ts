import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  ranges = {
    '3h': { num: 36 },
    '7d': { num: 144 },
    '14d': { num: 4032 },
  };

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

  getTemperatureChartConfigForRange(roomRef: string, range: string) {
    const config = this.lineConfigTemplate;
    const data = this.getTemperatureDataByRangeAndRoomRef(roomRef, range);
    config.data.labels = data.labels;
    config.data.datasets[0].data = data.values;
    return config;
  }

  getTemperatureDataByRangeAndRoomRef(roomref: string, range: string) {
    return {
      labels: _.range(1, this.ranges[range].num),
      values: Array.from({length: this.ranges[range].num}, () => _.random(-100, 100))
    };
  }

  getHumidityChartConfigForRange(roomRef: string, range: string) {
    const config = this.lineConfigTemplate;
    const data = this.getHumidityDataByRangeAndRoomRef(roomRef, range);
    config.data.labels = data.labels;
    config.data.datasets[0].data = data.values;
    return config;
  }

  getHumidityDataByRangeAndRoomRef(roomref: string, range: string) {
    return {
      labels: _.range(1, this.ranges[range].num),
      values: Array.from({length: this.ranges[range].num}, () => _.random(-100, 100))
    };
  }

  constructor() { }
}
