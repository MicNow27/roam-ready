import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectTrips,
  selectTripsStatus,
} from '../../store/trips-store/selectors/trips.selectors';
import { loadTrips } from '../../store/trips-store/actions/trips.actions';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  trips$ = this.store.select(selectTrips);
  tripsStatus$ = this.store.select(selectTripsStatus);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTrips());
  }

  tripName = (index: number, trip: { tripName: string }) => trip.tripName;

  onBeginClick() {
    this.onAddTrip();
  }

  onAddTrip() {
    this.router.navigate(['edit/new'], { relativeTo: this.route });
  }
}
