import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailComponent } from './room-list/room-detail/room-detail.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomResolver } from './resolve/room.resolver';
import { ROOM_DETAIL_ROUTES } from './room-list/room-detail/room-detail.routes';
import { ErrorPageComponent } from './error-page/error-page.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomListComponent },
  { path: 'rooms/:index', component: RoomDetailComponent, resolve: { room: RoomResolver }, children: ROOM_DETAIL_ROUTES },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
