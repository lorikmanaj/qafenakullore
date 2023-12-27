import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartCheckoutSyncService {
  private cartChangedSubject = new Subject<void>();

  cartChanged$ = this.cartChangedSubject.asObservable();

  notifyCartChanged() {
    this.cartChangedSubject.next();
  }

  constructor() { }
}
