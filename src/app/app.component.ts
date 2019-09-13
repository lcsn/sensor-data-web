import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from './service/room.service';
import { Room } from './model/room.model';
import { Observable, Observer, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInAndOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  showMenu = 'out';
  watchState = 'in';

  date = new Date();
  timeSub: Subscription;

  interval: any;
  time = new Observable<string>((observer: Observer<string>) => {
    this.interval = setInterval(() => {
      observer.next(new Date().toString());
    }, 1000);
  });

  rooms: Room[] = new Array();

  constructor(private roomService: RoomService) { }

  toggleMenu() {
    // this.showMenu = !this.showMenu;
    this.showMenu = (this.showMenu === 'in' ? 'out' : 'in');
  }

  toggleWatch() {
    this.watchState = (this.watchState === 'in' ? 'out' : 'in');
  }

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
    this.timeSub = this.time.subscribe((date: any) => {
      this.date = date;
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.timeSub.unsubscribe();
  }

}
