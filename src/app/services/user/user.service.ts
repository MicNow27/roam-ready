import { Injectable } from '@angular/core';
import { UserData } from '../../models/user.data';
import { Subject } from 'rxjs';
import { TripsService } from '../trips/trips.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserData | undefined;
  userChanged = new Subject<UserData>();

  constructor(private tripsService: TripsService) {}

  setUser(user: UserData) {
    this.user = user;
    this.userChanged.next(this.user);
    this.tripsService.setTrips(this.user.trips);
  }
}
