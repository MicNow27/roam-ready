import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activityNameRoute, tripNameRoute } from '../../../utils/routeNames';
import { Subscription } from 'rxjs';
import { selectTrips } from '../../store/trips-store/selectors/trips.selectors';
import { Store } from '@ngrx/store';
import { deleteTrip } from '../../store/trips-store/actions/trips.actions';
import { Activity, Trip } from '../../models/user.data';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, OnDestroy {
  trip: Trip | undefined;
  // trip$ = this.store.select(selectSelectedTrip);
  trips$ = this.store.select(selectTrips);
  // activities$ = this.store.select(selectActivities);
  tripsSub: Subscription | undefined;
  error = '';
  denied = false;
  activities: Activity[] = [];
  // tripsSubscription: Subscription | undefined;
  activityNameRoute = activityNameRoute;
  tripNameRoute = tripNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store // private tripsService: TripsService, // private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (!tripName) return;
    // this.store.dispatch(loadActivities({ tripName }));
    // this.store.dispatch(loadTrip({ tripName }));

    this.tripsSub = this.trips$.subscribe((trips) => {
      this.trip = trips.find((trip: Trip) => trip.tripName === tripName);
      this.activities = this.trip?.activities || [];
    });
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

  ngOnDestroy() {
    this.tripsSub?.unsubscribe();
  }

  activityName = (index: number, activity: { activityName: string }) =>
    activity.activityName;

  onEditTrip() {
    if (!this.trip) return;
    const tripNameRoute = this.tripNameRoute(this.trip);
    this.router.navigate(['../edit', tripNameRoute], {
      relativeTo: this.route,
      queryParams: { tripName: this.trip.tripName },
    });
  }

  onAddActivity() {
    this.router.navigate(['edit/new'], {
      relativeTo: this.route,
      queryParams: { tripName: this.trip?.tripName },
    });
  }

  onDeleteTrip() {
    if (!this.denied) {
      this.error = 'Are you sure you want to delete this trip?';
      return;
    }

    if (!this.trip) return;

    this.tripsSub = this.trips$.subscribe((trips) => {
      this.store.dispatch(deleteTrip({ trip: this.trip!, trips: trips }));
    });

    // this.tripsService.deleteTrip(this.trip);
    // await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
