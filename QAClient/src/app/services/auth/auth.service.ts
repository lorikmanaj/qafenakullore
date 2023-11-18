import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth/authResponse';
import { ApiService } from '../global/api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService, private jwtService: JwtService) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const data = { email, password };
    return this.apiService.post<AuthResponse, typeof data>('account/login', data).pipe(
      tap((res) => this.setAuth(res))
    );
  }

  register(user: any): Observable<any> {
    return this.apiService.post<any, any>('account/register', user).pipe(
      tap(({ user }) => this.setAuth(user))
    );
  }

  logout() {
    this.jwtService.purgeAuth();
  }

  isAuthenticated(): boolean {
    return this.jwtService.isAuthenticated();
  }

  private setAuth(res: any): void {
    console.log('user', res);
    this.jwtService.saveToken(res.token);
  }

  // private purgeAuth(): void {
  //   this.jwtService.purgeAuth();
  // }
}