import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import {
  selectActivity,
  selectActivityStatus,
} from '../../store/activities-store/selectors/activities.selectors';
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
  activityStatus$ = this.store.select(selectActivityStatus);
  error = '';
  currencyCode = 'R';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => [params['tripName'], params['activityName']]),
        tap(([tripName, activityName]) => {
          if (tripName && activityName) {
            this.store.dispatch(loadActivity({ tripName, activityName }));
          }
        }),
        switchMap(() => this.store.select(selectActivity))
      )
      .subscribe((activity) => {
        this.activity = activity;
      });
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
    this.router.navigate(['../edit', this.activity.activityName], {
      relativeTo: this.route,
    });
  }

  onDeleteActivity() {
    this.error = 'Are you sure you want to delete this activity?';
  }

  onCloseError() {
    this.error = '';
  }

  onAffirmError() {
    if (this.activity)
      this.store.dispatch(deleteActivity({ activity: this.activity }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
