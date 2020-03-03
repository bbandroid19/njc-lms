import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }
  loginUserData = {};
  registerUserData = {};
  showErrorMessage = false;
  errorMessage = '';
  registerUser() {
    this._auth.register(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._auth.closePopup();
        this._router.navigate(['/courses']);
      },
      err => {
        console.log(err);
        if (err.status === 404){
          this.showErrorMessage = true;
          this.errorMessage = 'Error please try again';
        }
      }
    )
  }
  togglePassword(){
    var inputPassword = document.getElementById('password');
    var eye = document.getElementsByClassName('fa-eye')[0];
    eye.classList.toggle('fa-eye-slash');
    if (inputPassword.getAttribute('type') === 'password') {
      inputPassword.setAttribute('type', 'text');
    } else {
      inputPassword.setAttribute('type', 'password');
    }
  }
  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._auth.closePopup();
        if (this._auth.isAdminLoggedIn()){
          this._router.navigate(['/manage-course']);
        }
        else{
          this._router.navigate(['/courses']);
        }
      },
      err => {
        console.log(err);
        if (err.status === 404){
          this.errorMessage = 'Invalid username and password Please try again';
          this.showErrorMessage = true;
        }
      }
    )
  }
  ngOnInit() {
  }

}
