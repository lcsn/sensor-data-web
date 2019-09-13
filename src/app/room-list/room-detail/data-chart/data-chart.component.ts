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

  selectedRoom: Room;
  dataSub: Subscription;

  availableRanges = [
    {label: '3 Std.', value: '3h'},
    {label: '6 Std.', value: '6h'},
    {label: '12 Std.', value: '12h'},
    {label: '24 Std.', value: '1d'},
  ];

  selectedRange = this.availableRanges[0];

  temperatureLineChart: Chart;
  humidityLineChart: Chart;

  temperatureRange = '3h';
  humidityRange = '3h';

  constructor(private route: ActivatedRoute, private chartService: ChartService) { }

  ngOnInit() {
    this.dataSub = this.route.data.subscribe((data: Data) => {
      this.selectedRoom = data.room;
    });
    const humidityChartCtx = this.humidityChart.nativeElement.getContext('2d');
    this.temperatureLineChart = new Chart(
      this.temperatureChart.nativeElement.getContext('2d'),
      this.chartService.getTemperatureChartConfigForRange('kueche', this.temperatureRange)
      // this.chartService.getLineChartConfig(
      //   [1, 2, 3, 4, 5, 6, 7], [65, 59, -80, 81, 56, 55, -40]
      // )
    );
    this.humidityLineChart = new Chart(
      humidityChartCtx,
      this.chartService.getHumidityChartConfigForRange('kueche', this.humidityRange)
      // this.chartService.getLineChartConfig(
      //   [1, 2, 3, 4, 5, 6, 7], [65, -59, 80, 81, -56, 55, 40]
      // )
    );
  }

  setTemperatureRange(newRange: string): void {
    this.temperatureRange = newRange;
    this.temperatureLineChart = new Chart(
      this.temperatureChart.nativeElement.getContext('2d'),
      this.chartService.getTemperatureChartConfigForRange('kueche', newRange)
    );
  }

  setHumidityRange(newRange: string): void {
    this.humidityRange = newRange;
    console.log(this.humidityLineChart);
  }

  onChangeRange() {
    const i = this.availableRanges.indexOf(this.selectedRange);
    this.selectedRange = this.availableRanges[(i + 1) % this.availableRanges.length];
  }

}
