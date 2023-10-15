import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { JwtService } from "./jwt.service";
import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) { }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/account/login`, { ...credentials })
      .pipe(tap((res) => this.setAuth(res)));
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/account/register`, { ...credentials })
      .pipe(tap(({ user }) => this.setAuth(user)));
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  getCurrentUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>("/user").pipe(
      tap({
        next: ({ user }) => this.setAuth(user),
        error: () => this.purgeAuth(),
      }),
      shareReplay(1)
    );
  }

  update(user: Partial<User>): Observable<{ user: User }> {
    return this.http.put<{ user: User }>("/user", { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      })
    );
  }

  setAuth(res: any): void {
    console.log('user', res);
    this.jwtService.saveToken(res.token);
    this.currentUserSubject.next(res);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
