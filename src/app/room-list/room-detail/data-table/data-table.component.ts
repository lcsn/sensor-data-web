import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements = [
    {id: 1, temperature: 19, humidity: 39, creationDate: new Date()},
    {id: 2, temperature: 20, humidity: 40, creationDate: new Date()},
    {id: 3, temperature: 21, humidity: 41, creationDate: new Date()},
    {id: 4, temperature: 22, humidity: 42, creationDate: new Date()},
    {id: 5, temperature: 23, humidity: 43, creationDate: new Date()},
    {id: 6, temperature: 24, humidity: 44, creationDate: new Date()},
    {id: 8, temperature: 25, humidity: 45, creationDate: new Date()}
  ];
  previous: any = [];
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
}
