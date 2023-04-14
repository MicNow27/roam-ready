import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity, Trip } from '../../models/user.data';
import { TripsService } from '../../services/trips/trips.service';
import { Subscription } from 'rxjs';
import { ActivitiesService } from '../../services/activities/activities.service';
import { activityNameRoute, tripNameRoute } from '../../../utils/routeNames';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  trip: Trip | undefined;
  activities: Activity[] = [
    {
      tripName: 'Paris',
      activityName: 'Louvre',
      activityDescription: 'Day at the Louvre Museum',
      tag: 'tourism',
      notes: `We'll spend the day at the museum and have lunch somewhere nearby.`,
      price: 5.0,
      startDate: new Date('2020-01-01 08:00:00').getTime(),
      endDate: new Date('2020-01-01 17:00:00').getTime(),
    },
  ];
  activitiesSubscription: Subscription | undefined;
  activityNameRoute = activityNameRoute;
  tripNameRoute = tripNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (tripName) this.trip = this.tripsService.getTrip(tripName);

    // this.activitiesSubscription =
    //   this.activitiesService.activitiesChanged.subscribe(
    //     (activities: Activity[]) => {
    //       this.activities = activities;
    //     }
    //   );

    // if (!this.trip) return;
    // this.activities = this.activitiesService.getActivitiesByTrip(
    //   this.trip.tripName
    // );
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
}
