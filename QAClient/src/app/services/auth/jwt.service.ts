import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtToken } from "src/app/models/jwt-token";
import { BehaviorSubject } from "rxjs";
@Injectable({ providedIn: "root" })
export class JwtService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private decodedToken: JwtToken | null = null;

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): JwtToken | null {
    const token = this.getToken();

    if (token) {
      const helper = new JwtHelperService();

      //Fix
      const isTokenExpired = helper.isTokenExpired(token);
      //console.log('Is Token Exp:', isTokenExpired)

      try {
        const decoded = helper.decodeToken(token) as JwtToken;
        //console.log('Decoded Token:', decoded);

        // Perform additional validation or checks here
        this.decodedToken = decoded;
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }

    return null;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
    this.decodeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated);
    return isAuthenticated;
  }

  purgeAuth(): void {
    localStorage.removeItem('token');
    this.decodedToken = null;
    this.isAuthenticatedSubject.next(false);
  }

  hasRole(role: string): boolean {
    const decodedToken = this.decodeToken();
    //console.log('Aktivja:', this.decodedToken);

    const roles = decodedToken?.role;

    if (roles && Array.isArray(roles)) {
      //console.log('Expected Role:', role);
      const normalizedRole = role.toLowerCase(); // Convert the provided role to lowercase
      return roles.some((r) => {
        //console.log('Comparing to Role in Token:', r.toLowerCase());
        return r.toLowerCase() === normalizedRole;
      });
    }

    return false;
  }

  getUserId(): string | null {
    const decodedToken = this.decodeToken();
    //console.log('Dec Token:', decodedToken);
    //console.log('USER ID', decodedToken?.uid)
    return decodedToken?.uid ?? null;
  }
}
