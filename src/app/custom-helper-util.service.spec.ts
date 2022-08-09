import { TestBed } from '@angular/core/testing';

import { CustomHelperUtilService } from './custom-helper-util.service';

describe('CustomHelper.UtilService', () => {
  let service: CustomHelperUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHelperUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
