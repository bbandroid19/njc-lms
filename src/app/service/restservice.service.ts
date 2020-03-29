import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, forkJoin } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestserviceService {
  constructor(private http: HttpClient) {}
  getCourseContent(): Observable<any> {
    return this.http.get<any>("api/courses/5e7f6e153090dbd18d03d8af", {}).pipe(
      tap(result => console.log(result)),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  getCourses(): Observable<any> {
    return this.http.get<any>("api/courses/5e7f6e153090dbd18d03d8af", {}).pipe(
      tap(result => console.log(result)),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
