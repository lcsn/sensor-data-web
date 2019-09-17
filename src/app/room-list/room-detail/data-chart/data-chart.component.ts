import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from 'src/app/service/chart.service';
import { Chart } from 'chart.js';
import { Room } from 'src/app/model/room.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent implements OnInit {

  @ViewChild('temperatureChart', { static: true }) temperatureChart: ElementRef;
  @ViewChild('humidityChart', { static: true }) humidityChart: ElementRef;
  temperatureChartCtx: any;
  humidityChartCtx: any;
  temperatureLineChart: Chart;
  humidityLineChart: Chart;

  selectedRoom: Room;
  dataSub: Subscription;

  availableRanges = [
    { label: '3 Std.', value: '3h' },
    { label: '6 Std.', value: '6h' },
    { label: '12 Std.', value: '12h' },
    { label: '24 Std.', value: '1d' },
  ];

  selectedTemperatureRange = this.availableRanges[0];
  selectedHumidityRange = this.availableRanges[0];

  temperatureOffset = 0;
  humidityOffset = 0;

  changePending = false;
  changeDelay: number;

  constructor(private route: ActivatedRoute, private chartService: ChartService) { }

  ngOnInit() {
    this.temperatureChartCtx = this.temperatureChart.nativeElement.getContext('2d');
    this.humidityChartCtx = this.humidityChart.nativeElement.getContext('2d');
    this.dataSub = this.route.parent.data.subscribe((data: Data) => {
      this.selectedRoom = data.room;
    });
    this.reloadTemperatureChart();
    this.reloadHumidityChart();
  }

  reloadTemperatureChart() {
    // this.temperatureChartCtx.clear(0, 0, this.temperatureChartCtx.width, this.temperatureChartCtx.height);
    this.chartService.getTemperatureChart(
      this.temperatureChartCtx,
      this.selectedRoom.refName,
      this.temperatureOffset,
      this.selectedTemperatureRange.value)
      .subscribe((chart: Chart) => {
        this.temperatureLineChart = chart;
      });
  }

  reloadHumidityChart() {
    this.chartService.getHumidityChart(
      this.humidityChartCtx,
      this.selectedRoom.refName,
      this.humidityOffset,
      this.selectedHumidityRange.value)
      .subscribe((chart: Chart) => {
        this.humidityLineChart = chart;
      });
  }

  getNextSelectedRange(current: { label: string, value: string }) {
    const i = this.availableRanges.indexOf(current);
    return this.availableRanges[(i + 1) % this.availableRanges.length];
  }

  onChangeTemperatureRange() {
    this.selectedTemperatureRange = this.getNextSelectedRange(this.selectedTemperatureRange);
    this.changeDelay = 500;
    if (!this.changePending) {
      this.changePending = true;
      setTimeout(() => {
        this.reloadTemperatureChart();
        this.changePending = false;
      }, this.changeDelay);
    }
  }

  onChangeHumidityRange() {
    this.selectedHumidityRange = this.getNextSelectedRange(this.selectedHumidityRange);
    this.changeDelay = 500;
    if (!this.changePending) {
      this.changePending = true;
      setTimeout(() => {
        this.reloadHumidityChart();
        this.changePending = false;
      }, this.changeDelay);
    }
  }

  onDecreaseTemperatureOffset() {
    this.temperatureOffset = this.temperatureOffset < 1 ? 0 : this.temperatureOffset - 1;
    this.reloadTemperatureChart();
  }

  onIncreaseTemperatureOffset() {
    this.temperatureOffset++;
    this.reloadTemperatureChart();
  }

  onDecreaseHumidityOffset() {
    this.humidityOffset = this.humidityOffset < 1 ? 0 : this.humidityOffset - 1;
    this.reloadHumidityChart();
  }

  onIncreaseHumidityOffset() {
    this.humidityOffset++;
    this.reloadHumidityChart();
  }

}
