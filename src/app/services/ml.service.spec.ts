import { TestBed } from '@angular/core/testing';

import { MlService } from './ml.service';

describe('MlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlService = TestBed.get(MlService);
    expect(service).toBeTruthy();
  });
});
