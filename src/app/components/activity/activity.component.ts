import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { activityNameRoute } from '../../../utils/routeNames';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { selectActivity } from '../../store/activities-store/selectors/activities.selectors';
import {
  deleteActivity,
  loadActivity,
} from '../../store/activities-store/actions/activities.actions';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activity: Activity | undefined;
  activity$ = this.store.select(selectActivity);
  // tripName = '';
  // activityName = '';
  error = '';
  denied = false;
  currencyCode = 'R';
  activityNameRoute = activityNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store // private authService: AuthService // private tripsService: TripsService, // private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    console.log('ActivityComponent.ngOnInit()');
    this.route.params
      .pipe(
        map((params) => [params['tripName'], params['activityName']]),
        tap(([tripName, activityName]) => {
          if (tripName && activityName) {
            console.log('component: ' + tripName + ' ' + activityName);
            this.store.dispatch(loadActivity({ tripName, activityName }));
            // this.tripName = tripName;
            // this.activityName = activityName;
          }
        }),
        switchMap(() => this.store.select(selectActivity))
      )
      .subscribe((activity) => {
        this.activity = activity;
        console.log('ActivityComponent.ngOnInit() activity: ' + activity);
      });

    // const tripName = this.route.snapshot.queryParamMap.get('tripName');
    // if (!tripName) return;
    //
    // const activityName = this.route.snapshot.queryParamMap.get('activityName');
    // if (activityName)
    //   this.activity = this.tripsService.getActivityByTripAndActivity(
    //     tripName,
    //     activityName
    //   );
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
    // const activityNameRoute = this.activityNameRoute(this.activity);
    this.router.navigate(['../edit', this.activity.activityName], {
      relativeTo: this.route,
    });
  }

  onDeleteActivity() {
    if (!this.denied) {
      this.error = 'Are you sure you want to delete this trip?';
      return;
    }
    if (this.activity)
      this.store.dispatch(deleteActivity({ activity: this.activity }));
    // if (!this.activity) return;
    // this.tripsService.deleteActivity(this.activity);
    // await this.firestoreService.updateTrips(this.tripsService.getTrips());
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }
}
