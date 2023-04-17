import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../models/user.data';
import { Store } from '@ngrx/store';
import { selectTrips } from '../../store/trips-store/selectors/trips.selectors';
import {
  addTrip,
  updateTrip,
} from '../../store/trips-store/actions/trips.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-item-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss'],
})
export class TripEditComponent implements OnInit, OnDestroy {
  oldTrip: Trip | undefined;
  editMode = false;
  prompt = 'Add a new trip';
  tripForm: FormGroup = new FormGroup({});
  error = '';
  denied = false;
  trips$ = this.store.select(selectTrips);
  tripsSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    // private tripsService: TripsService,
    private store: Store,
    private router: Router // private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const tripName = this.route.snapshot.queryParamMap.get('tripName');
    if (tripName) {
      this.editMode = true;
      this.prompt = 'Update your trip';
    }

    this.tripsSub = this.trips$.subscribe((trips) => {
      this.oldTrip = trips.find((trip: Trip) => trip.tripName === tripName);
      this.initForm();
    });

    // this.route.params
    //   .pipe(
    //     map((params) => params['tripName']),
    //     switchMap((tripName) => {
    //       this.editMode = tripName != null;
    //       return this.store.select(selectTripsState);
    //     }),
    //     map((tripsState) =>
    //       tripsState.trips.find(
    //         (trip: Trip) =>
    //           trip.tripName ===
    //           this.route.snapshot.queryParamMap.get('tripName')
    //       )
    //     )
    //   )
    //   .subscribe((trip) => {
    //     this.oldTrip = trip;
    //     this.initForm();
    //   });

    // const tripName = this.route.snapshot.queryParamMap.get('tripName');
    // if (tripName) {
    //   this.oldTrip = this.tripsService.getTrip(tripName);
    //   this.editMode = true;
    //   this.prompt = 'Update your trip';
    // }

    // this.initForm();
  }

  ngOnDestroy() {
    this.tripsSub?.unsubscribe();
  }

  onSubmit() {
    const trip: Trip = {
      tripName: this.tripForm.value.tripName,
      tripDescription: this.tripForm.value.tripDescription,
      activities: this.oldTrip ? this.oldTrip.activities : undefined,
    };

    console.log('trip', trip);

    this.tripsSub = this.trips$.subscribe((trips) => {
      if (this.editMode && this.oldTrip) {
        console.log('updateTrip');
        this.store.dispatch(
          updateTrip({
            oldTrip: this.oldTrip,
            newTrip: trip,
            trips: trips,
          })
        );
      } else {
        this.store.dispatch(
          addTrip({
            trip: trip,
            trips: trips,
          })
        );
      }
    });
    this.completeTripEdit();
    // if (this.editMode && this.oldTrip) {
    //   this.tripsService.updateTrip(this.oldTrip, trip);
    // } else {
    //   this.tripsService.addTrip(trip);
    // }
    // await this.firestoreService.updateTrips(this.tripsService.getTrips());
    // this.completeTripEdit();
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
    if (this.editMode)
      this.router.navigate(['../'], { relativeTo: this.route });
    else this.router.navigate(['../../'], { relativeTo: this.route });
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
