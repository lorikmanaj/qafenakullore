import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, throwError, of } from "rxjs";

import { map, distinctUntilChanged, tap, shareReplay, switchMap, catchError } from "rxjs/operators";
import { User } from "../models/user";
import { ApiService } from "./global/api.service";
import { AuthService } from "./auth/auth.service";

@Injectable({ providedIn: "root" })
export class UserService {
  isAuthenticated$: Observable<boolean>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // private currentUserSubject = new BehaviorSubject<User | null>(null);
  // public currentUser = this.currentUserSubject
  //   .asObservable()
  //   .pipe(distinctUntilChanged());

  //public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    console.log('user svc e re', this.isAuthenticated$)
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticatedSubject.next(isAuthenticated);
      console.log('ALLO USER SVC status changed:', isAuthenticated);
    });
  }

  getUserId(): string | null {
    return this.authService.getUid();
  }

  login(email: string, password: string): Observable<any> {
    return this.authService.login(email, password);
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

  IsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  onAuthenticationChanged(): Observable<boolean> {
    return this.isAuthenticated$;
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