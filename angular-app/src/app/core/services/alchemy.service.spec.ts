import { TestBed } from '@angular/core/testing';

import { ViemService } from './viem.service';

describe('AlchemyService', () => {
  let service: ViemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
