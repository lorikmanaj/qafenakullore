import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => {
    const authGuard = TestBed.inject(AuthGuard); // Create an instance of AuthGuard
    return authGuard.canActivate(...guardParameters); // Call canActivate method
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Provide AuthGuard
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
