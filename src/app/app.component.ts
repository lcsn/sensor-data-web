import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
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
