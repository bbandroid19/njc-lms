import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "./../environments/environment";
@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService {
  constructor(public authService: AuthService) {}
  intercept(req, next) {
    console.log(req);
    let tokenizedReq;
    console.log(localStorage.getItem("token"));
    // if (req.url.startsWith("api")) {
    console.log(environment);
    const url = environment.backendBaseUrl;
    req = req.clone({
      url: url + req.url
    });
    // }
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
