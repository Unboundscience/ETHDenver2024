import { TestBed } from '@angular/core/testing';

import { JsonpocService } from './jsonpoc.service';

describe('JsonpocService', () => {
  let service: JsonpocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonpocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
