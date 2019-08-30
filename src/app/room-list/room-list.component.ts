import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: Room[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }

}
