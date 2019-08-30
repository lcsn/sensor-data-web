import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoomService } from '../service/room.service';
import { Observable } from 'rxjs';
import { Room } from '../model/room.model';

@Injectable({
    providedIn: 'root'
})
export class RoomResolver implements Resolve<Room> {

    constructor(private roomService: RoomService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Room | Observable<Room> | Promise<Room> {
        const IDX = 'index';
        return this.roomService.getRoomByIndex(+route.params[IDX]);
    }

}
