import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  popup = false;
  constructor() { }
  popupSelected() {
    this.popup = !this.popup;
  }
  isPopupSelected() {
    return this.popup;
  }
  isLogin() {

  }
  isRegistration() {

  }
}
