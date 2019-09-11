import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from 'src/app/service/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent implements OnInit {

  @ViewChild('temperatureChart', { static: true }) temperatureChart: ElementRef;
  @ViewChild('humidityChart', { static: true }) humidityChart: ElementRef;

  temperatureLineChart: Chart;
  humidityLineChart: Chart;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    const temperatureChartCtx = this.temperatureChart.nativeElement.getContext('2d');
    const humidityChartCtx = this.humidityChart.nativeElement.getContext('2d');
    this.temperatureLineChart = new Chart(
      temperatureChartCtx,
      this.chartService.getLineChartConfig(
        [1, 2, 3, 4, 5, 6, 7], [65, 59, -80, 81, 56, 55, -40]
      )
    );
    this.humidityLineChart = new Chart(
      humidityChartCtx,
      this.chartService.getLineChartConfig(
        [1, 2, 3, 4, 5, 6, 7], [65, -59, 80, 81, -56, 55, 40]
      )
    );
  }

}
