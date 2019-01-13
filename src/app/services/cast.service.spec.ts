import { TestBed } from '@angular/core/testing';

import { CastService } from './cast.service';

describe('CastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CastService = TestBed.get(CastService);
    expect(service).toBeTruthy();
  });
});
