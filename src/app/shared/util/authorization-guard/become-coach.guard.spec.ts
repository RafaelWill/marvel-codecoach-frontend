import { TestBed } from '@angular/core/testing';

import { BecomeCoachGuard } from './become-coach.guard';

describe('BecomeCoachGuard', () => {
  let guard: BecomeCoachGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BecomeCoachGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
