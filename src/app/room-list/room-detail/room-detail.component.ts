import { Component, OnInit, OnDestroy } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/model/room.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  selectedRoom: Room;

  dataSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSub = this.route.data.subscribe((data: Data) => {
        const ROOM = 'room';
        this.selectedRoom = data[ROOM];
      });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }


}
