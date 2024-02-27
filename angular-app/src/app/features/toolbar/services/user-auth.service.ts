import {Injectable} from '@angular/core';
import {Store} from "../../../core/classes/store.class";

type UserAuth = {
  isLoggedIn: boolean;
  isWalletConnected: boolean;
}

const init: UserAuth = {
  isLoggedIn: false,
  isWalletConnected: false
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService extends Store<UserAuth> {

  constructor() {
    super(init)
  }

  login(): void {
    this.setState((state: UserAuth) => ({
      isLoggedIn: true,
      isWalletConnected: true
    }));
  }

  logout(): void {
    this.setState((state: UserAuth) => ({
      isLoggedIn: false,
      isWalletConnected: false
    }));
  }
}
