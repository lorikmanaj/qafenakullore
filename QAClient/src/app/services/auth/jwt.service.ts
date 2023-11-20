import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JwtService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // For simplicity, consider the user authenticated if a token is present
  }

  purgeAuth(): void {
    localStorage.removeItem('token')
  }
}
