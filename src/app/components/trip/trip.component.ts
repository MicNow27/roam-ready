import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity, Trip } from '../../models/user.data';
import { TripsService } from '../../services/trips/trips.service';
import { activityNameRoute, tripNameRoute } from '../../../utils/routeNames';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  trip: Trip | undefined;
  error = '';
  denied = false;
  activities: Activity[] = [];
  tripsSubscription: Subscription | undefined;
  activityNameRoute = activityNameRoute;
  tripNameRoute = tripNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (tripName) this.trip = this.tripsService.getTrip(tripName);

    this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
      (trips: Trip[]) => {
        this.activities =
          trips.find((trip: Trip) => trip.tripName === this.trip?.tripName)
            ?.activities || [];
      }
    );

    if (!this.trip) return;
    this.activities = this.tripsService.getActivitiesByTrip(this.trip.tripName);
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

  async onDeleteTrip() {
    if (!this.denied) {
      this.error = 'Are you sure you want to delete this trip?';
      return;
    }
    if (!this.trip) return;
    this.tripsService.deleteTrip(this.trip);
    await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
