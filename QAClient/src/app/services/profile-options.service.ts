import { Injectable } from '@angular/core';
import { ProfileOption } from '../models/profileOptions';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileOptionsService {
  private profileOptionsSubject = new BehaviorSubject<ProfileOption[]>([
    // {
    //   optionId: 1,
    //   option: 'Profile'
    // },
    // {
    //   optionId: 2,
    //   option: 'Profile'
    // },
    // {
    //   optionId: 3,
    //   option: 'Profile'
    // },
  ]);

  profileOptions$ = this.profileOptionsSubject.asObservable();

  constructor() { }

  getProfileOptions(): Observable<ProfileOption[]> {
    return this.profileOptions$;
  }
}
