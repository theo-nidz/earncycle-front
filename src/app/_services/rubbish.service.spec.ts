import { TestBed } from '@angular/core/testing';

import { RubbishService } from './rubbish.service';

describe('RubbishService', () => {
  let service: RubbishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubbishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
