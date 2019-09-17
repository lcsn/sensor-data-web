
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RoomDetailComponent } from './room-list/room-detail/room-detail.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomListItemComponent } from './room-list/room-list-item/room-list-item.component';
import { DataChartComponent } from './room-list/room-detail/data-chart/data-chart.component';
import { DataTableComponent } from './room-list/room-detail/data-table/data-table.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BlinkDirective } from './directive/blink.directive';

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    RoomListItemComponent,
    RoomDetailComponent,
    DataChartComponent,
    DataTableComponent,
    ErrorPageComponent,
    BlinkDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
