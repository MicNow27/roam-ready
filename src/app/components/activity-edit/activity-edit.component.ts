import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/user.data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { selectActivity } from '../../store/activities-store/selectors/activities.selectors';
import { AuthService } from '../../services/auth/auth.service';
import {
  addActivity,
  loadActivity,
  updateActivity,
} from '../../store/activities-store/actions/activities.actions';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss'],
})
export class ActivityEditComponent implements OnInit {
  tripName = '';
  oldActivity: Activity | undefined;
  oldActivity$ = this.store.select(selectActivity);
  editMode = false;
  prompt = 'Add a new activity';
  activityForm: FormGroup = new FormGroup({});
  error = '';
  tag = 'travel';
  currencySymbol = 'R';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => [params['tripName'], params['activityName']]),
        tap(([tripName, activityName]) => {
          this.tripName = tripName;
          if (activityName) {
            this.editMode = true;
            this.prompt = 'Update your activity';
            this.store.dispatch(loadActivity({ tripName, activityName }));
          }
        }),
        switchMap(() => this.store.select(selectActivity))
      )
      .subscribe((activity) => {
        this.oldActivity = activity;
        this.initForm();
      });
  }

  onSubmit() {
    this.authService.authState$
      .pipe(
        map((user) => user?.uid),
        map((authUserId) => {
          if (!authUserId) return null;
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
          return activity;
        })
      )
      .subscribe((activity) => {
        if (!activity) return;
        if (this.editMode && this.oldActivity) {
          this.store.dispatch(
            updateActivity({
              oldActivity: this.oldActivity,
              newActivity: activity,
            })
          );
        } else {
          this.store.dispatch(addActivity({ activity: activity }));
        }
        this.completeActivityEdit();
      });
  }

  onCloseError() {
    this.error = '';
  }

  onAffirmError() {
    this.completeActivityEdit();
  }

  onCancel() {
    if (this.activityForm.dirty) {
      this.error = 'Do you want to proceed without saving?';
    } else {
      this.completeActivityEdit();
    }
  }

  private completeActivityEdit() {
    if (this.editMode) {
      this.route.paramMap.subscribe((params) => {
        const tripName = params.get('tripName');
        const activityName = params.get('activityName');
        this.router.navigate(['/trips', tripName, activityName]);
      });
    } else this.router.navigate(['../../'], { relativeTo: this.route });
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
