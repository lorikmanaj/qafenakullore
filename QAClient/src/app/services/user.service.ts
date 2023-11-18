import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { JwtService } from "./auth/jwt.service";
import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { User } from "../models/user";
import { ApiService } from "./global/api.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(private readonly apiService: ApiService,
    private jwtService: JwtService) { }

  getCurrentUser(): Observable<{ user: User }> {
    return this.apiService.get<{ user: User }>('Users/Current').pipe(
      tap({
        next: ({ user }) => this.setCurrentUser(user),
        error: () => this.purgeAuth(),
      }),
      shareReplay(1)
    );
  }

  getCartId(userId: string): Observable<number> {
    // Make a GET request to retrieve the cartId for the user from the server
    return this.apiService.get<number>(`Carts/${userId}`);
  }

  // update(user: Partial<User>): Observable<{ user: User }> {
  //   return this.apiService.put<{ user: User }, Partial<User>>('Users', { user }).pipe(
  //     tap(({ user }) => {
  //       this.currentUserSubject.next(user);
  //     })
  //   );
  // }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}