import { Injectable } from '@angular/core';
import { Room } from '../model/room.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorData } from '../model/sensor-data.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms: Room[] = [
    new Room('Küche', 'kueche', { temperature: 20.0, humidity: 56 }),
    new Room('Kinderzimmer', 'kinderzimmer', { temperature: 21.0, humidity: 57 }),
    new Room('Wohnzimmer', 'wohnzimmer', { temperature: 22.0, humidity: 58 }),
    new Room('Keller 1', 'keller1', { temperature: 23.0, humidity: 59 }),
    new Room('Schlafzimmer', 'schlafzimmer', { temperature: 24.0, humidity: 60 })
  ];

  constructor(private http: HttpClient) { }

  getSensorData(location: string): Observable<SensorData> {
    return this.http.get('http://localhost:5000/dht22/' + location)
      .pipe(map((data: SensorData) => {
        return data;
      }));
  }

  getTemperature(location: string): Observable<number> {
    return this.getSensorData(location).pipe(map((data: SensorData) => {
      return data.temperature;
    }));
  }

  getHumidity(location: string): Observable<number> {
    return this.getSensorData(location).pipe(map((data: SensorData) => {
      return data.humidity;
    }));
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  getRoomByIndex(index: number): Room {
    return this.rooms[index];
  }

}
