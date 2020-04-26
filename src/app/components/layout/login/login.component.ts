import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth.service";
import { Router } from "@angular/router";
import { CommonService } from "src/app/service/common.service";
import { LoaderService } from "src/app/service/loader.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService
  ) {}
  loginUserData = {
    userid: null,
    password: null
  };
  registerUserData = {};
  showErrorMessage = false;
  errorMessage = "";
  registerUser() {
    this.loaderService.showLoader();
    this._auth.register(this.registerUserData).subscribe(
      res => {
        this.loaderService.hideLoader();
        this._auth.closePopup();
        this._router.navigate(["/"]);
      },
      err => {
        this.loaderService.hideLoader();
        console.log(err);
        if (err.status === 404) {
          this.showErrorMessage = true;
          this.errorMessage = "Error please try again";
        }
      }
    );
  }
  togglePassword() {
    var inputPassword = document.getElementById("password");
    var eye = document.getElementsByClassName("fa-eye")[0];
    eye.classList.toggle("fa-eye-slash");
    if (inputPassword.getAttribute("type") === "password") {
      inputPassword.setAttribute("type", "text");
    } else {
      inputPassword.setAttribute("type", "password");
    }
  }
  loginUser() {
    this.loaderService.showLoader();
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        this.loaderService.hideLoader();
        console.log(res);
        if (res && res.data && res.data.enrollments) {
          this.commonService.setEnrollment(res.data.enrollments);
        }

        localStorage.setItem("token", res.token);
        localStorage.setItem("userData", JSON.stringify(res));
        this._auth.closePopup();
        if (this._auth.isAdminLoggedIn()) {
          this._router.navigate(["/courses"]);
        } else {
          this._router.navigate(["/courses"]);
        }
      },
      err => {
        this.loaderService.hideLoader();
        console.log(err);
        if (err.status === 404) {
          this.errorMessage = "Invalid username and password Please try again";
          this.showErrorMessage = true;
        }
      }
    );
  }
  ngOnInit() {}
}
