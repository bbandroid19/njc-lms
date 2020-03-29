import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
@Injectable({
  providedIn: "root"
})
export class AuthService {
  loginUrl = "https://localhost:5000/auth/login";
  registerUrl = "https://localhost:5000/auth/register";
  isloader = false;
  testStarted = false;
  loginUser(user) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const options = { headers };
    return this.http.post<any>(this.loginUrl, JSON.stringify(user), options);
  }
  register(registerData) {
    console.log(registerData);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const options = { headers };
    return this.http.post<any>(
      this.registerUrl,
      JSON.stringify(registerData),
      options
    );
  }
  openPopup() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("thim-popup-active");
  }
  activateLogin() {
    this.openPopup();
    document.getElementById("thim-popup-login").classList.add("active");
    document.getElementById("thim-popup-login").classList.remove("sign-up");
    document.getElementById("thim-popup-login").classList.add("sign-in");
  }
  activateRegistration() {
    this.openPopup();
    document.getElementById("thim-popup-login").classList.add("active");
    document.getElementById("thim-popup-login").classList.remove("sign-in");
    document.getElementById("thim-popup-login").classList.add("sign-up");
  }
  closePopup() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("thim-popup-active");
    document.getElementById("thim-popup-login").classList.remove("active");
  }
  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }
  isLoggedIn() {
    return !!localStorage.getItem("token");
  }
  isAdminLoggedIn() {
    return !(
      localStorage.getItem("token") &&
      helper.decodeToken(localStorage.getItem("token")).role[0] === "user"
    );
  }
  startTest() {
    this.testStarted = true;
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("course-item-popup");
  }
  stopTest() {
    this.testStarted = false;
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("course-item-popup");
  }
  isTestStarted() {
    return this.testStarted;
  }
  constructor(private http: HttpClient, private _router: Router) {}
}
