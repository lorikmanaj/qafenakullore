import { Injectable, OnInit } from "@angular/core";
import { Observable, BehaviorSubject, throwError, of } from "rxjs";

import { map, distinctUntilChanged, tap, shareReplay, switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { ApiService } from "./global/api.service";
import { AuthService } from "./auth/auth.service";

@Injectable({ providedIn: "root" })
export class UserService implements OnInit {
  isAuthenticated$: Observable<boolean>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // private currentUserSubject = new BehaviorSubject<User | null>(null);
  // public currentUser = this.currentUserSubject
  //   .asObservable()
  //   .pipe(distinctUntilChanged());

  cartId: number | null = null;

  //public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticatedSubject.next(isAuthenticated);
    });
  }

  getCartId(): Observable<number> {
    const userId = this.authService.getUid();

    if (userId) {
      return this.apiService.get<any>(`Carts/${userId}`).pipe(
        map((response) => response.cartId)
      );
    }

    return throwError('UserId not available');
  }

  login(email: string, password: string): Observable<any> {
    return this.authService.login(email, password).pipe(
      switchMap(() => {
        // Assuming authService.login updates the isAuthenticated$ immediately
        this.isAuthenticatedSubject.next(true);

        return this.getCartId().pipe(
          tap((cartId) => {
            console.log('CartId after login:', cartId);
            this.cartId = cartId;
          })
        );
      })
    );
  }

  register(user: any): Observable<any> {
    return this.authService.register(user).pipe(
      tap(() => {
        //this.getCurrentUser().subscribe()
      }) // Update current user after registration
    );
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticatedSubject.next(false); // Set the authentication status
  } //t

  hasRole(role: string) {
    return this.authService.hasRole(role);
  }

  IsAuth() {
    return this.isAuthenticated$ ?? false;
  }

  // getCurrentUser(): Observable<{ user: User }> {
  //   return this.apiService.get<{ user: User }>('Users/Current').pipe(
  //     tap({
  //       next: ({ user }) => this.setCurrentUser(user),
  //       error: () => this.purgeAuth(),
  //     }),
  //     shareReplay(1)
  //   );    
  // }

  // private setCurrentUser(user: User): void {
  //   //this.currentUserSubject.next(user);
  // }

  // update(user: Partial<User>): Observable<{ user: User }> {
  //   return this.apiService.put<{ user: User }, Partial<User>>('Users', { user }).pipe(
  //     tap(({ user }) => {
  //       this.currentUserSubject.next(user);
  //     })
  //   );
  // }

}