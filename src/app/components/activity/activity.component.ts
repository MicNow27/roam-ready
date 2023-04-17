import { Component, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { activityNameRoute } from '../../../utils/routeNames';
import { selectTrips } from '../../store/trips-store/selectors/trips.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { deleteActivity } from '../../store/trips-store/actions/trips.actions';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  activity: Activity | undefined;
  trips$ = this.store.select(selectTrips);
  tripsSub: Subscription | undefined;
  error = '';
  denied = false;
  currencyCode = 'R';
  activityNameRoute = activityNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store // private tripsService: TripsService, // private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    const activityName = this.route.snapshot.queryParamMap.get('activityName');
    if (!tripName) return;

    this.tripsSub = this.trips$.subscribe((trips) => {
      const trip = trips.find((trip) => trip.tripName === tripName);
      this.activity = trip?.activities?.find(
        (activity) => activity.activityName === activityName
      );
    });
    // if (activityName)
    //   this.activity = this.tripsService.getActivityByTripAndActivity(
    //     tripName,
    //     activityName
    //   );
  }

  ngOnDestroy() {
    this.tripsSub?.unsubscribe();
  }

  startDate() {
    if (!this.activity) return;
    return new Date(this.activity.startDate);
  }

  endDate() {
    if (!this.activity) return;
    return new Date(this.activity.endDate);
  }

  onEditActivity() {
    if (!this.activity) return;
    const activityNameRoute = this.activityNameRoute(this.activity);
    this.router.navigate(['../edit', activityNameRoute], {
      relativeTo: this.route,
      queryParams: {
        tripName: this.activity.tripName,
        activityName: this.activity.activityName,
      },
    });
  }

  async onDeleteActivity() {
    if (!this.denied) {
      this.error = 'Are you sure you want to delete this trip?';
      return;
    }
    if (!this.activity) return;

    this.tripsSub = this.trips$.subscribe((trips) => {
      this.store.dispatch(
        deleteActivity({ activity: this.activity!, trips: trips })
      );
    });

    // this.tripsService.deleteActivity(this.activity);
    // await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
