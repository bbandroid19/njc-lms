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
    tokenizedReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        "X-Auth-Token " + localStorage.getItem("token")
      )
    });
    return next.handle(tokenizedReq);
  }
}
