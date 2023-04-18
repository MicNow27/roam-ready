import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/user.data';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTrip } from '../../store/trips-store/selectors/trips.selectors';
import { AuthService } from '../../services/auth/auth.service';
import {
  addTrip,
  loadTrip,
  updateTrip,
} from '../../store/trips-store/actions/trips.actions';

@Component({
  selector: 'app-trip-item-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss'],
})
export class TripEditComponent implements OnInit {
  oldTrip: Trip | undefined;
  oldTrip$ = this.store.select(selectTrip); // Keep.
  editMode = false;
  prompt = 'Add a new trip';
  tripForm: FormGroup = new FormGroup({});
  error = '';
  denied = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => params['tripName']),
        tap((tripName) => {
          if (tripName) {
            this.editMode = true;
            this.prompt = 'Update your trip';
            this.store.dispatch(loadTrip({ tripName }));
          }
        }),
        switchMap(() => this.store.select(selectTrip))
      )
      .subscribe((trip) => {
        this.oldTrip = trip;
        this.initForm();
      });
  }

  onSubmit() {
    this.authService.authState$
      .pipe(
        map((user) => user?.uid),
        map((authUserId) => {
          if (!authUserId) return null;
          const trip: Trip = {
            authUserId: authUserId,
            tripName: this.tripForm.value.tripName,
            tripDescription: this.tripForm.value.tripDescription,
          };
          return trip;
        })
      )
      .subscribe((trip) => {
        if (!trip) return;
        if (this.editMode && this.oldTrip) {
          this.store.dispatch(
            updateTrip({ oldTrip: this.oldTrip, newTrip: trip })
          );
        } else {
          this.store.dispatch(addTrip({ trip: trip }));
        }
        this.completeTripEdit();
      });
  }

  onCancel() {
    if (this.tripForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
      return;
    }
    this.denied = false;
    this.completeTripEdit();
  }

  onHandleError() {
    this.error = '';
    this.denied = true;
  }

  private completeTripEdit() {
    if (this.editMode) {
      this.route.paramMap.subscribe((params) => {
        const tripName = params.get('tripName');
        this.router.navigate(['/trips', tripName]);
      });
    } else this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private initForm() {
    let tripName = '';
    let tripDescription = '';

    if (this.editMode && this.oldTrip) {
      tripName = this.oldTrip.tripName;
      tripDescription = this.oldTrip.tripDescription || '';
    }

    this.tripForm = new FormGroup({
      tripName: new FormControl(tripName, Validators.required),
      tripDescription: new FormControl(tripDescription),
    });
  }
}
