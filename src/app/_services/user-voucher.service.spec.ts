import { TestBed } from '@angular/core/testing';

import { UserVoucherService } from './user-voucher.service';

describe('UserVoucherService', () => {
  let service: UserVoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
