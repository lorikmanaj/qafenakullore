import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { User } from "../models/user";
import { ApiService } from "./global/api.service";
import { AuthService } from "./auth/auth.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private cartId: number | null = null;

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService
  ) { }

  getCurrentUser(): Observable<{ user: User }> {
    return this.apiService.get<{ user: User }>('Users/Current').pipe(
      tap({
        next: ({ user }) => this.setCurrentUser(user),
        error: () => this.purgeAuth(),
      }),
      shareReplay(1)
    );
  }

  getCartId(userId: string): Observable<any> {
    return this.apiService.get<any>(`Carts/${userId}`).pipe(
      tap((response) => this.cartId = response.cartId)
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.authService.login(email, password).pipe(
      tap(() => {
        // Update current user after login
        this.getCurrentUser().subscribe((response) => {
          const user = response.user;

          // Fetch and set the cartId after login using CartService
          if (user && user.userId) {
            this.getCartId(user.userId).subscribe((cartId) => {
              // Here you can do further logic or store the cartId as needed
              console.log('CartId after login:', cartId);
            });
          }
        });
      })
    );
  }

  register(user: any): Observable<any> {
    return this.authService.register(user).pipe(
      tap(() => this.getCurrentUser().subscribe()) // Update current user after registration
    );
  }

  // update(user: Partial<User>): Observable<{ user: User }> {
  //   return this.apiService.put<{ user: User }, Partial<User>>('Users', { user }).pipe(
  //     tap(({ user }) => {
  //       this.currentUserSubject.next(user);
  //     })
  //   );
  // }

  logout(): void {
    this.authService.logout();
    this.purgeAuth();
  }

  hasRole(role: string) {
    return this.authService.hasRole(role);
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}