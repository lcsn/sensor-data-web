import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailComponent } from './room-list/room-detail/room-detail.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomResolver } from './resolve/room.resolver';

const ROUTES: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomListComponent},
  { path: 'rooms/:index', component: RoomDetailComponent, resolve: {room: RoomResolver}},
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
