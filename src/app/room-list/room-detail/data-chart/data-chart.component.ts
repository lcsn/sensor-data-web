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

  constructor(private route: ActivatedRoute, private chartService: ChartService) { }

  ngOnInit() {
    this.temperatureChartCtx = this.temperatureChart.nativeElement.getContext('2d');
    this.humidityChartCtx = this.humidityChart.nativeElement.getContext('2d');
    this.dataSub = this.route.parent.data.subscribe((data: Data) => {
      this.selectedRoom = data.room;
    });
    this.chartService.getTemperatureChart(
      this.temperatureChartCtx,
      this.selectedRoom.refName,
      this.temperatureOffset,
      '3h')
      .subscribe((chart: Chart) => {
        this.temperatureLineChart = chart;
      });
    this.chartService.getHumidityChart(
      this.humidityChartCtx,
      this.selectedRoom.refName,
      this.humidityOffset,
      '3h')
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
    this.chartService.getTemperatureChart(
      this.temperatureChartCtx,
      this.selectedRoom.refName,
      this.temperatureOffset,
      this.selectedTemperatureRange.value)
      .subscribe((chart: Chart) => {
        this.temperatureLineChart = chart;
      });
  }

  onChangeHumidityRange() {
    this.selectedHumidityRange = this.getNextSelectedRange(this.selectedHumidityRange);
    this.chartService.getHumidityChart(
      this.humidityChartCtx,
      this.selectedRoom.refName,
      this.humidityOffset,
      this.selectedHumidityRange.value)
      .subscribe((chart: Chart) => {
        this.humidityLineChart = chart;
      });
  }

  onDecreaseTemperatureOffset() {
    this.temperatureOffset = this.temperatureOffset < 1 ? 0 : this.temperatureOffset - 1;
  }

  onIncreaseTemperatureOffset() {
    this.temperatureOffset++;
  }

  onDecreaseHumidityOffset() {
    this.humidityOffset = this.humidityOffset < 1 ? 0 : this.humidityOffset - 1;
  }

  onIncreaseHumidityOffset() {
    this.humidityOffset++;
  }

}
