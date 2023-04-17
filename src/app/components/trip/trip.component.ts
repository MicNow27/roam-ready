import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/user.data';
import { activityNameRoute, tripNameRoute } from '../../../utils/routeNames';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActivities } from '../../store/activities-store/selectors/activities.selectors';
import { loadActivities } from '../../store/activities-store/actions/activities.actions';
import { selectTrip } from '../../store/trips-store/selectors/trips.selectors';
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
  // tripName = '';
  error = '';
  denied = false;
  // activities: Activity[] = [];
  activities$ = this.store.select(selectActivities);
  // tripsSubscription: Subscription | undefined;
  activityNameRoute = activityNameRoute;
  tripNameRoute = tripNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store // private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    console.log('trip.component.ts: ngOnInit()');
    this.route.params
      .pipe(
        map((params) => params['tripName']),
        tap((tripName) => {
          if (tripName) {
            console.log('component: ' + tripName);
            this.store.dispatch(loadActivities({ tripName }));
            this.store.dispatch(loadTrip({ tripName }));
            // this.tripName = tripName;
          }
        }),
        switchMap(() => this.store.select(selectTrip))
      )
      .subscribe((trip) => {
        this.trip = trip;
      });

    // const tripName = this.route.snapshot.queryParamMap.get('tripName');
    // if (tripName) this.trip = this.tripsService.getTrip(tripName);
    //
    // this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
    //   (trips: Trip[]) => {
    //     this.activities =
    //       trips.find((trip: Trip) => trip.tripName === this.trip?.tripName)
    //         ?.activities || [];
    //   }
    // );
    //
    // if (!this.trip) return;
    // this.activities = this.tripsService.getActivitiesByTrip(this.trip.tripName);
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
    // if (!this.trip) return;
    // this.tripsService.deleteTrip(this.trip);
    // await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
