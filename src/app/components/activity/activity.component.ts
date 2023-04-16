import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { activityNameRoute } from '../../../utils/routeNames';
import { TripsService } from '../../services/trips/trips.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activity: Activity | undefined;
  activityNameRoute = activityNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripsService: TripsService
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
}
