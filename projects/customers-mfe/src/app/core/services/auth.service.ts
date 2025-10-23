import { Injectable, computed, signal } from '@angular/core';
import { TITLE_BUTTON_LOGIN, TITLE_BUTTON_LOGOUT } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = signal<boolean>(false);

  public currenUser = computed(() => this.isAuthenticated());

  public titleButtonLogin = computed(() => TITLE_BUTTON_LOGIN);
  public titleButtonLogout = computed(() => TITLE_BUTTON_LOGOUT);

  constructor() { }

  public login(){
    this.isAuthenticated.set(true);
  }

  public logout(){
    this.isAuthenticated.set(false);
  }

}
