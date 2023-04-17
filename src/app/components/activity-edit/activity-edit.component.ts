import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { selectActivitiesState } from '../../store/activities-store/selectors/activities.selectors';
import { AuthService } from '../../services/auth/auth.service';
import {
  addActivity,
  updateActivity,
} from '../../store/activities-store/actions/activities.actions';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class ActivityEditComponent implements OnInit {
  tripName = '';
  oldActivityName = '';
  oldActivity: Activity | undefined;
  editMode = false;
  prompt = 'Add a new activity';
  activityForm: FormGroup = new FormGroup({});
  error = '';
  denied = false;
  tag = 'travel';
  currencySymbol = 'R';

  constructor(
    private route: ActivatedRoute,
    // private tripsService: TripsService,
    private router: Router,
    private store: Store,
    private authService: AuthService // private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => [params['tripName'], params['activityName']]),
        switchMap(([tripName, activityName]) => {
          this.tripName = tripName;
          this.oldActivityName = activityName;
          this.editMode = activityName != null;
          return this.store.select(selectActivitiesState);
        }),
        map((activitiesState) =>
          activitiesState.activities.find(
            (activity) => activity.activityName === this.oldActivityName
          )
        )
      )
      .subscribe((activity) => {
        this.oldActivity = activity;
        this.initForm();
      });

    // const tripName = this.route.snapshot.queryParamMap.get('tripName');
    // if (!tripName) return;
    // this.tripName = tripName;
    // const activityName = this.route.snapshot.queryParamMap.get('activityName');
    // if (activityName) {
    //   this.oldActivity = this.tripsService.getActivityByTripAndActivity(
    //     this.tripName,
    //     activityName
    //   );
    //   this.editMode = true;
    //   this.prompt = 'Update your activity';
    //   if (this.oldActivity) this.tag = this.oldActivity.tag;
    // }
    // this.initForm();
  }

  onSubmit() {
    const authUserId = this.authService.authUserId;
    if (!authUserId) return;

    const activity: Activity = {
      authUserId: authUserId,
      tripName: this.tripName,
      activityName: this.activityForm.value.activityName,
      activityDescription: this.activityForm.value.activityDescription,
      tag: this.activityForm.value.tag,
      notes: this.activityForm.value.notes,
      startDate: this.activityForm.value.startDate.getTime(),
      endDate: this.activityForm.value.endDate.getTime(),
      price: this.activityForm.value.price,
    };

    if (this.editMode && this.oldActivity) {
      this.store.dispatch(
        updateActivity({ oldActivity: this.oldActivity, newActivity: activity })
      );
    } else {
      this.store.dispatch(addActivity({ activity: activity }));
    }
    this.completeActivityEdit();
    // const activity: Activity = {
    //   tripName: this.tripName,
    //   activityName: this.activityForm.value.activityName,
    //   activityDescription: this.activityForm.value.activityDescription,
    //   tag: this.activityForm.value.tag,
    //   notes: this.activityForm.value.notes,
    //   startDate: this.activityForm.value.startDate.getTime(),
    //   endDate: this.activityForm.value.endDate.getTime(),
    //   price: this.activityForm.value.price,
    // };
    //
    // if (this.editMode && this.oldActivity) {
    //   this.tripsService.updateActivityInTrip(activity);
    // } else {
    //   this.tripsService.addActivityToTrip(activity);
    // }
    // await this.firestoreService.updateTrips(this.tripsService.getTrips());
    // this.completeActivityEdit();
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }

  onCancel() {
    if (this.activityForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
      return;
    }
    this.denied = false;
    this.completeActivityEdit();
  }

  private completeActivityEdit() {
    if (this.editMode) {
      this.route.paramMap.subscribe((params) => {
        const tripName = params.get('tripName');
        const activityName = params.get('activityName');
        this.router.navigate(['/trips', tripName, activityName]);
      });
    }
    // this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private initForm() {
    let activityName = '';
    let activityDescription = '';
    let notes = '';
    let tag = this.tag;
    let startDate;
    let endDate;
    let price = 0;

    if (this.editMode && this.oldActivity) {
      activityName = this.oldActivity.activityName;
      activityDescription = this.oldActivity.activityDescription || '';
      notes = this.oldActivity.notes || '';
      tag = this.oldActivity.tag;
      startDate = new Date(this.oldActivity.startDate);
      endDate = new Date(this.oldActivity.endDate);
      price = this.oldActivity.price;
    }

    this.activityForm = new FormGroup({
      activityName: new FormControl(activityName, Validators.required),
      activityDescription: new FormControl(activityDescription),
      notes: new FormControl(notes),
      tag: new FormControl(tag, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
      price: new FormControl(price, Validators.required),
    });
  }
}
