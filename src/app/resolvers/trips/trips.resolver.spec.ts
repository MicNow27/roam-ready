import { TestBed } from '@angular/core/testing';

import { TripsResolver } from './trips.resolver';

describe('TripsResolver', () => {
  let resolver: TripsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TripsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
