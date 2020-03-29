import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService {
  constructor(private authService: AuthService) {}
  intercept(req, next) {
    console.log(req);
    const re = /register/;
    let tokenizedReq;
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      tokenizedReq = req.clone({
        headers: req.headers.set("X-Auth-Token", localStorage.getItem("token"))
      });
    } else {
      tokenizedReq = req.clone({
        headers: req.headers.set("X-Auth-Token", "")
      });
    }

    return next.handle(tokenizedReq);
  }
}
