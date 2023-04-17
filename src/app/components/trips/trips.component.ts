import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { TripsService } from '../../services/trips/trips.service';
import { tripNameRoute } from '../../../utils/routeNames';
import { selectTrips } from '../../store/trips-store/selectors/trips.selectors';
import { Store } from '@ngrx/store';
import { loadTrips } from '../../store/trips-store/actions/trips.actions';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  // trips: Trip[] = [];
  trips$ = this.store.select(selectTrips);
  // tripsSubscription: Subscription | undefined;
  tripNameRoute = tripNameRoute;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store // private tripsService: TripsService
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
