import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth/authResponse';
import { ApiService } from '../global/api.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const data = { email, password };
    return this.apiService.post<AuthResponse, typeof data>('auth/login', data).pipe(
      tap((res) => {
        this.setAuth(res);
        this.router.navigate(['/home']);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.apiService.post<any, any>('auth/register', user).pipe(
      tap(({ user }) => this.setAuth(user))
    );
  }

  logout() {
    this.jwtService.purgeAuth();
  }

  isAuthenticated(): boolean {
    return this.jwtService.isAuthenticated();
  }

  getToken(): string | null {
    return this.jwtService.getToken();
  }

  private setAuth(res: any): void {
    console.log('user', res);
    this.jwtService.saveToken(res.token);
  }
}
