import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JwtService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  destroyToken(): void {
    localStorage.removeItem('token')
  }
}



// AuthGuard per routes
// AuthService per buttons/lists
// HttpService 