import { AuthorizeGuard } from './authorize-guard';

describe('AuthorizeGuard', () => {
  it('should create an instance', () => {
    expect(new AuthorizeGuard()).toBeTruthy();
  });
});
