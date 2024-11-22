import { TestBed } from '@angular/core/testing';

import { HotelModelService } from './hotel-model.service';

describe('HotelModelService', () => {
  let service: HotelModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
