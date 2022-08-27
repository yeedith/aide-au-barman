import { TestBed } from '@angular/core/testing';

import { ApiBarmanService } from './api-barman.service';

describe('ApiBarmanService', () => {
  let service: ApiBarmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBarmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
