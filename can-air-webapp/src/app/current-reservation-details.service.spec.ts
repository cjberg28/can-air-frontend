import { TestBed } from '@angular/core/testing';

import { CurrentReservationDetailsService } from './current-reservation-details.service';

describe('CurrentReservationDetailsService', () => {
  let service: CurrentReservationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentReservationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
