import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TripsService } from '../../services/trips/trips.service';
import { Activity, Trip } from '../../models/user.data';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss'],
})
export class TripEditComponent implements OnInit {
  oldTrip: Trip | undefined;
  tripName: string = '';
  editMode = false;
  tripForm: FormGroup = new FormGroup({});
  activities: Activity[] = [];
  error: string | null = '';
  denied = false;

  // activitiesSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tripName = params['tripName'];
      if (this.tripName)
        this.oldTrip = this.tripsService.getTrip(this.tripName);
      else this.editMode = true;
      this.initForm();
    });

    // this.activitiesSubscription =
    //   this.activitiesService.activitiesChanged.subscribe(
    //     (activities: Activity[]) => {
    //       this.activities = this.activitiesService.getActivitiesByTrip(
    //         this.tripName
    //       ); // TODO: Eh?
    //     }
    //   );
    // this.activities = this.activitiesService.getActivitiesByTrip(this.tripName);
  }

  async onSubmit() {
    console.log(this.tripForm.value + ' save clicked');
    if (this.editMode && this.oldTrip) {
      this.tripsService.updateTrip(this.oldTrip, this.tripForm.value);
    } else {
      this.tripsService.addTrip(this.tripForm.value);
    }

    if (!this.tripsService.getUser()) return;
    console.log('userId: ' + this.tripsService.getUser()?.userId);
    await this.firestoreService.updateTrips(
      this.tripsService.getUser()!,
      this.tripsService.getTrips()
    );
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddActivity() {
    if (this.editMode && this.tripForm.dirty && !this.denied) {
      console.log('denied: ' + this.denied);
      this.error = 'Do you want to proceed without saving?';
    }
    if (this.denied) {
      console.log('add activity');
      // TODO: route to activities new
      this.denied = false;
    }
  }

  onGoToActivities() {
    if (this.editMode && this.tripForm.dirty && !this.denied) {
      this.error = 'Do you want to proceed without saving?';
    }
    if (this.denied) {
      // TODO: route to activities
      this.denied = false;
    }
  }

  onHandleError() {
    this.error = null;
    this.denied = true;
    console.log('denied: ' + this.denied);
  }

  private initForm() {
    let tripName = '';
    let tripDescription = '';

    if (this.editMode && this.oldTrip) {
      tripName = this.oldTrip.name;
      tripDescription = this.oldTrip.description || '';
    }

    this.tripForm = new FormGroup({
      tripName: new FormControl(tripName, Validators.required),
      tripDescription: new FormControl(tripDescription),
    });
  }
}
