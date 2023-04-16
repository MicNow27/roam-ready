import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { activityNameRoute } from '../../../utils/routeNames';
import { TripsService } from '../../services/trips/trips.service';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activity: Activity | undefined;
  error = '';
  denied = false;
  currencyCode = 'R';
  activityNameRoute = activityNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (!tripName) return;

    const activityName = this.route.snapshot.queryParamMap.get('activityName');
    if (activityName)
      this.activity = this.tripsService.getActivityByTripAndActivity(
        tripName,
        activityName
      );
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
    this.tripsService.deleteActivity(this.activity);
    await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
