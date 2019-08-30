import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { RoomService } from './service/room.service';
import { Room } from './model/room.model';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  showMenu = false;

  interval: any;
  time = new Observable<string>((observer: Observer<string>) => {
    this.interval = setInterval(() => observer.next(new Date().toString()), 1000);
  });

  rooms: Room[] = new Array();

  constructor(private roomService: RoomService) { }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}

/*

  @ViewChild('chart', { static: true }) chart: ElementRef;
  public chartType: string = 'polarArea';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(219, 0, 0, 0.1)',
        'rgba(0, 165, 2, 0.1)',
        'rgba(255, 195, 15, 0.2)',
        'rgba(55, 59, 66, 0.1)',
        'rgba(0, 0, 0, 0.3)'
      ],
      hoverBackgroundColor: [
        'rgba(219, 0, 0, 0.2)',
        'rgba(0, 165, 2, 0.2)',
        'rgba(255, 195, 15, 0.3)',
        'rgba(55, 59, 66, 0.1)',
        'rgba(0, 0, 0, 0.4)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  ngOnInit(): void {
    console.log('initialized');
    const ctx = this.chart.nativeElement.getContext('2d');
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 2
        },
        {
          label: 'My Second dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2
        }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
*/