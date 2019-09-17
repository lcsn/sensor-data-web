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
  @ViewChild('fromDateElRef', { static: true }) fromDateElRef: ElementRef;
  @ViewChild('untilDateElRef', { static: true }) untilDateElRef: ElementRef;

  selectedRoom: Room;
  dataSub: Subscription;

  searchText = '';

  fromDate = new Date();
  // fromDateAsString: string;
  untilDate = new Date();
  // untilDateAsString: string;
  pageSize = 6;

  elements: any = [];
  previous: any = [];

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef) { }

  @HostListener('input', ['$event.target']) oninput(target: any) {
    this.searchItems();
  }

  ngOnInit() {
    this.fromDate.setDate(this.untilDate.getDate() - 1);
    // this.fromDateAsString = '2011-01-01';
    // this.untilDateAsString = this.untilDate.toLocaleString();
    this.dataSub = this.route.parent.data.subscribe((data: Data) => {
      this.selectedRoom = data.room;
    });
    this.reloadTable();
    this.fromDateElRef.nativeElement.addEventListener('input', (e: Event) => { this.onChangeFromDate(e); } );
    this.untilDateElRef.nativeElement.addEventListener('input', (e: Event) => { this.onChangeUntilDate(e); } );
  }

  onChangeFromDate(e: Event) {
    const date = Date.parse(e.target.value);
    if (date) {
      this.fromDate = new Date(date);
    } else {
      this.fromDate = null;
    }
  }

  onChangeUntilDate(e: Event) {
    const date = Date.parse(e.target.value);
    if (date) {
      this.untilDate = new Date(date);
    } else {
      this.untilDate = null;
    }
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

  reloadTable() {
    this.roomService.getSensorDataTable(this.selectedRoom.refName, this.fromDate, this.untilDate)
      .subscribe((data: { id: number, temperature: number, humidity: number, creationDate: Date }) => {
        this.mdbTable.setDataSource(data);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

}
