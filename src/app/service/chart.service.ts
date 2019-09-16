import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Observer, throwError } from 'rxjs';
import { Chart } from 'chart.js'
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  getLineChartConfigTemplate() {
    return Object.assign({}, this.lineConfigTemplate);
  }

  getTemperatureChart(ctx: any, room: string, offset: number, range: string): Observable<Chart> {
    return this.getTemperatureDataByRange(room, offset, range).pipe(map((data: { labels: Array<number>, values: Array<number> }) => {
      const config = this.getLineChartConfigTemplate();
      config.data.labels = data.labels;
      config.data.datasets[0].data = data.values;
      return new Chart(ctx, config);
    }));
    // new Observable((observer: Observer<Chart>) => {
    //   setTimeout(() => {
    //     observer.next(new Chart(ctx, this.getTemperatureChartConfig(room, offset, range)));
    //   }, 500);
    // });
  }

  getHumidityChart(ctx: any, room: string, offset: number, range: string): Observable<Chart> {
    return this.getHumidityDataByRange(room, offset, range).pipe(map((data: { labels: Array<number>, values: Array<number> }) => {
      const config = this.getLineChartConfigTemplate();
      config.data.labels = data.labels;
      config.data.datasets[0].data = data.values;
      return new Chart(ctx, config);
    }));
    // return new Observable((observer: Observer<Chart>) => {
    //   setTimeout(() => {
    //     observer.next(new Chart(ctx, this.getHumidityChartConfig(room, offset, range)));
    //   }, 500);
    // });
  }

  getTemperatureDataByRange(room: string, offset: number, range: string): Observable<{ labels: Array<number>, values: Array<number> }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    params = params.append('offset', '' + offset);
    params = params.append('range', range);
    return this.http.get('http://localhost:5000/dht22/' + room + '/temperature/chart', { headers, params })
      .pipe(map((data: { labels: Array<number>, values: Array<number> }) => {
        return data;
      }))
      .pipe(catchError((error: Response) => {
        return throwError('Could not load temperature data: ' + error);
      }));
  }

  getHumidityDataByRange(room: string, offset: number, range: string): Observable<{ labels: Array<number>, values: Array<number> }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    params = params.append('offset', '' + offset);
    params = params.append('range', range);
    return this.http.get('http://localhost:5000/dht22/' + room + '/humidity/chart', { headers, params })
      .pipe(map((data: { labels: Array<number>, values: Array<number> }) => {
        return data;
      }))
      .pipe(catchError((error: Response) => {
        return throwError('Could not load humidity data: ' + error);
      }));
  }

}
