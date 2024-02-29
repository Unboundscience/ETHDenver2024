import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserAccountService {
    currentUser: any;
    constructor() {
      this.currentUser = {};
    }

    setUser(prop: string, value: string): void {
      this.currentUser[prop] = value;
    }

    getCurrentUser(): any {
        return this.currentUser;
    }
}
