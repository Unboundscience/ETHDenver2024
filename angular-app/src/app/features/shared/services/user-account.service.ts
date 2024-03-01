import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserAccount {
    id?: string;
    username?: string;
    email?: string;
    userClass: string;
}

@Injectable({ providedIn: 'root' })
export class UserAccountService {
    private userSubject = new BehaviorSubject<any>({});
    user$: Observable<UserAccount>;

    constructor() {
        this.user$ = this.userSubject.asObservable();
    }

    public setUser(user: UserAccount): void {
        // this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    public setUserProp(prop: string, value: string): void {
        const upd = { ...this.userSubject.getValue(), [prop]: value };
        localStorage.setItem('user', JSON.stringify(upd));
    }

    public getUser(): UserAccount | null {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    }
}
