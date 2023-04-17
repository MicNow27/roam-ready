import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tripNameRoute } from '../../../utils/routeNames';
import { Store } from '@ngrx/store';
import {
  selectTrips,
  selectTripStatus,
} from '../../store/trips-store/selectors/trips.selectors';
import { loadTrips } from '../../store/trips-store/actions/trips.actions';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  // trips: Trip[] = [];
  // tripsSubscription: Subscription | undefined;
  trips$ = this.store.select(selectTrips);
  tripStatus$ = this.store.select(selectTripStatus);
  tripNameRoute = tripNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTrips());
    // this.tripsSubscription = this.tripsService.tripsChanged.subscribe(
    //   (trips: Trip[]) => {
    //     this.trips = trips;
    //   }
    // );
    // this.trips = this.tripsService.getTrips();
  }

  tripName = (index: number, trip: { tripName: string }) => trip.tripName;

  onBeginClick() {
    this.onAddTrip();
  }

  onAddTrip() {
    this.router.navigate(['edit/new'], { relativeTo: this.route });
  }
}
