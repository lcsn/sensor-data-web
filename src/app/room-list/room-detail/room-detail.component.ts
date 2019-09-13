import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/model/room.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  selectedRoom: Room;

  dataSub: Subscription;

  constructor(private route: ActivatedRoute,
              private location: Location) { }

  back(): void {
    this.location.back();
  }

  ngOnInit() {
    this.dataSub = this.route.data.subscribe((data: Data) => {
      this.selectedRoom = data.room;
    });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

}
