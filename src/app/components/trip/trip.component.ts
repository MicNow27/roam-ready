import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/user.data';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectActivities,
  selectActivitiesStatus,
} from '../../store/activities-store/selectors/activities.selectors';
import { loadActivities } from '../../store/activities-store/actions/activities.actions';
import {
  selectTrip,
  selectTripStatus,
} from '../../store/trips-store/selectors/trips.selectors';
import {
  deleteTrip,
  loadTrip,
} from '../../store/trips-store/actions/trips.actions';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  trip: Trip | undefined;
  trip$ = this.store.select(selectTrip);
  tripStatus$ = this.store.select(selectTripStatus);
  activities$ = this.store.select(selectActivities);
  activitiesStatus$ = this.store.select(selectActivitiesStatus);
  error = '';
  denied = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => params['tripName']),
        tap((tripName) => {
          if (tripName) {
            this.store.dispatch(loadActivities({ tripName }));
            this.store.dispatch(loadTrip({ tripName }));
          }
        }),
        switchMap(() => this.store.select(selectTrip))
      )
      .subscribe((trip) => {
        this.trip = trip;
      });
  }

  activityName = (index: number, activity: { activityName: string }) =>
    activity.activityName;

  onEditTrip() {
    if (!this.trip) return;
    this.router.navigate(['../edit', this.trip.tripName], {
      relativeTo: this.route,
    });
  }

  onAddActivity() {
    this.router.navigate(['edit/new'], {
      relativeTo: this.route,
    });
  }

  onDeleteTrip() {
    if (!this.denied) {
      this.error = 'Are you sure you want to delete this trip?';
      return;
    }
    if (this.trip) this.store.dispatch(deleteTrip({ trip: this.trip }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
