
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

@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    RoomListItemComponent,
    RoomDetailComponent
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
