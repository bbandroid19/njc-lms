import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, tap } from "rxjs/operators";
import { Observable, of, BehaviorSubject } from "rxjs";
import { LoaderService } from "./service/loader.service";
const helper = new JwtHelperService();
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  public isLoginObs: Observable<boolean> = this._isLoginSubject.asObservable();
  testStarted = false;
  baseUrl = "http://138.197.104.124:5555";
  loginUser(user) {
    this.loaderService.showLoader();
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const options = { headers };
    return this.http
      .post<any>(this.baseUrl + "/auth/login", JSON.stringify(user), options)
      .pipe(
        tap(result => {
          this.loaderService.hideLoader();
        })
      );
  }
  register(registerData) {
    console.log(registerData);
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const options = { headers };
    return this.http.post<any>(
      this.baseUrl + "/auth/register",
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
    this._isLoginSubject.next(true);
    document.getElementById("thim-popup-login").classList.add("active");
    document.getElementById("thim-popup-login").classList.remove("sign-up");
    document.getElementById("thim-popup-login").classList.add("sign-in");
  }
  activateRegistration() {
    this.openPopup();
    this._isLoginSubject.next(false);

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
  private handleError<T>(operation = "operation", result?: T) {
    this.loaderService.hideLoader();
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  constructor(
    private http: HttpClient,
    private _router: Router,
    private loaderService: LoaderService
  ) {}
}
