import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth/authResponse';
import { ApiService } from '../global/api.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router) {
    this.isAuthenticatedSubject.next(this.jwtService.isAuthenticated());
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const data = { email, password };
    return this.apiService.post<AuthResponse, typeof data>('auth/login', data).pipe(
      tap((res) => {
        this.setAuth(res);
        const decodedToken = this.jwtService.decodeToken();
        this.isAuthenticatedSubject.next(true);

        console.log('User authenticated:', this.isAuthenticatedSubject.value);
        console.log('Mas Lloginit Token:', decodedToken);
        this.router.navigateByUrl(this.router.url).then(() => {
          this.router.navigate(['/home']);
        });
      })
    );
  }

  register(user: { email: string, password: string }): Observable<any> {
    return this.apiService.post<any, any>('auth/register', user).pipe(
      tap((response) => this.setAuth(response)),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.jwtService.purgeAuth();
    this.isAuthenticatedSubject.next(false); // Set the authentication status
  }

  isAuthenticated(): boolean {
    return this.jwtService.isAuthenticated();
  }

  getToken(): string | null {
    return this.jwtService.getToken();
  }

  getUid(): string | null {
    return this.jwtService.getUserId();
  }

  hasRole(role: string): boolean {
    return this.jwtService.hasRole(role);
  }

  private setAuth(res: any): void {
    console.log('API Response:', res);

    if (res && res.token) {
      this.jwtService.saveToken(res.token);
      this.isAuthenticatedSubject.next(true);

      this.router.navigate(['/home']);
    } else {
      console.error('Invalid response or missing token:', res);
      this.isAuthenticatedSubject.next(false);
    }
  }

}
