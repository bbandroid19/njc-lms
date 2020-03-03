import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authService: AuthService){}
  intercept(req, next) {
    console.log(req);
    const re = /register/;
    let tokenizedReq;
      tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'X-Auth-Token eyJhbGciOiJIUzUxMiIsImlhdCI6MTU4MjU1Mjk5MSwiZXhwIjoxNTgyNTUzNTkxfQ.eyJ1c2VyaWQiOiJ0d29mYXVsdHlAZ21haWwuY29tIiwicm9sZSI6WyJjYW5kaWRhdGUiXX0.JCHsBvYsY7I2PMCo1o9GaQOxr983HXzZaYJm9ZRoXKywg59WqUbiZBK2eXX0HzfjpYMdf9XXd9hwkSAzlFvDRg')
        }
      )
    return next.handle(tokenizedReq);
  }
}
