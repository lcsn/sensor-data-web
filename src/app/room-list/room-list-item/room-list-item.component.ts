import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Room } from 'src/app/model/room.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { RoomService } from 'src/app/service/room.service';
import { SensorData } from 'src/app/model/sensor-data.model';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss']
})
export class RoomListItemComponent implements OnInit, OnDestroy {

  @Input() room: Room;
  @Input() index: number;

  sensorData: SensorData;
  tendency = 'constant';

  sensorDataSubject = new Subject<SensorData>();
  sensorDataSubscription: Subscription;

  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sensorDataSubscription = this.sensorDataSubject.subscribe((data: SensorData) => {
      this.sensorData = data;
      this.tendency = data.tendency;
    });
    this.roomService.getSensorData(this.room.refName).subscribe((data: SensorData) => {
      this.sensorDataSubject.next(data);
    });
    setInterval(() => {
      this.roomService.getSensorData(this.room.refName).subscribe((data: SensorData) => {
        this.sensorDataSubject.next(data);
      });
    }, 5000);
  }

  getTemperatureIconAndColor() {
    if (this.sensorData && this.sensorData.temperature >= 30) {
      return {'fa-temperature-high': true, 'red-text':  true};
    } else if (this.sensorData && this.sensorData.temperature < 30 && this.sensorData.temperature >= 25 ) {
      return {'fa-thermometer-three-quarters': true, 'orange-text':  true};
    } else if (this.sensorData && this.sensorData.temperature < 25 && this.sensorData.temperature >= 20 ) {
      return {'fa-thermometer-half': true, 'light-blue-text':  true};
    } else if (this.sensorData && this.sensorData.temperature < 20 && this.sensorData.temperature >= 15 ) {
      return {'fa-thermometer-quarter': true, 'cyan-text':  true};
    } else if (this.sensorData && this.sensorData.temperature < 15 ) {
      return {'fa-temperature-low': true, 'indigo-text':  true};
    } else {
      return {'fa-thermometer-half': true};
    }
  }

  getTendencyIcon() {
    if (this.sensorData && this.sensorData.tendency === 'up') {
      return {'fas fa-chevron-up':  true};
    } else if (this.sensorData && this.sensorData.tendency === 'constant') {
      return {};
    } else if (this.sensorData && this.sensorData.tendency === 'down') {
      return {'fas fa-chevron-down':  true};
    } else {
      return {};
    }
  }

  ngOnDestroy() {
    if (this.sensorDataSubscription) {
      this.sensorDataSubscription.unsubscribe();
    }
  }

  onSelect() {
    this.router.navigate([this.index], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
