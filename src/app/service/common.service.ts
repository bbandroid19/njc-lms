import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  popup = false;
  studentEnrollment = [];
  constructor() {}
  popupSelected() {
    this.popup = !this.popup;
  }
  isPopupSelected() {
    return this.popup;
  }
  setEnrollment = data => {
    this.studentEnrollment = data;
  };
  getEnrollment() {
    return this.studentEnrollment;
  }
  isLogin() {}
  isRegistration() {}
}
