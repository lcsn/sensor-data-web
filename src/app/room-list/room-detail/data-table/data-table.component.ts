import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, HostListener } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Room } from 'src/app/model/room.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  selectedRoom: Room;
  dataSub: Subscription;

  searchText = '';

  fromDate = new Date();
  // fromDateAsString: string;
  untilDate = new Date();
  // untilDateAsString: string;
  pageSize = 10;

  elements = [
    { id: 1, temperature: 19, humidity: 39, creationDate: new Date() },
    { id: 2, temperature: 20, humidity: 40, creationDate: new Date() },
    { id: 3, temperature: 21, humidity: 41, creationDate: new Date() },
    { id: 4, temperature: 22, humidity: 42, creationDate: new Date() },
    { id: 5, temperature: 23, humidity: 43, creationDate: new Date() },
    { id: 6, temperature: 24, humidity: 44, creationDate: new Date() },
    { id: 8, temperature: 25, humidity: 45, creationDate: new Date() }
  ];

  previous: any = [];

  constructor(private roomService: RoomService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    // this.untilDate.setDate(this.fromDate.getDate() - 1);
    // this.fromDateAsString = '2011-01-01';
    // this.untilDateAsString = this.untilDate.toLocaleString();
    this.dataSub = this.route.parent.data.subscribe((data: Data) => {
      this.selectedRoom = data.room;
    });
    this.roomService.getSensorDataTable(this.selectedRoom.refName, this.fromDate, this.untilDate)
      .subscribe((data: { id: number, temperature: number, humidity: number, creationDate: Date }) => {
        this.mdbTable.setDataSource(data);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.pageSize);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

}
