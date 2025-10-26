import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthClient } from '../models/AuthUser';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  private userSubject: BehaviorSubject<AuthClient>;
  public user: Observable<AuthClient>;
  constructor (private localStorageService: LocalStorageService) {
    this.userSubject = new BehaviorSubject<AuthClient>(this.localStorageService.getObject('authClient'));
    this.user = this.userSubject.asObservable();
  }

  get userValue(): AuthClient {
    return this.userSubject.value;
  }
}
