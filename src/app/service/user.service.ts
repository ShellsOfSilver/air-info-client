import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    const user = localStorage.getItem('dataSource');
    if(user){
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('dataSource', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserObs(): Observable<any> {
    return this.currentUserSubject;
  }

  removeCurrentUser(): any {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
