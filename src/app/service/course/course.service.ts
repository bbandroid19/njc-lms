import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import swal from "sweetalert2";
import { AuthService } from "src/app/auth.service";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courseContent = null;
  editedCourse = null;
  constructor(private http: HttpClient, private authService: AuthService) {}

  completeStep(obj, id): Observable<any> {
    this.authService.showLoader();
    return this.http.put<any>("api/enrollment/" + id, obj).pipe(
      tap(result => {
        this.authService.hideLoader();
      }),
      catchError(this.handleError<any>("complete step error"))
    );
  }
  getCourseContent(url): Observable<any> {
    this.authService.showLoader();
    return this.http.get<any>("api/courses?=", {}).pipe(
      tap(result => {
        this.authService.hideLoader();
      }),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  setCourseContent(content) {
    this.courseContent = content;
  }

  getCourses(): Observable<any> {
    this.authService.showLoader();
    return this.http.get<any>("api/courses", {}).pipe(
      tap(result => {
        this.authService.hideLoader();
      }),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  enrollCourse(courseId): Observable<any> {
    this.authService.showLoader();
    return this.http
      .post<any>("api/enrollment/course/" + courseId, JSON.stringify({}))
      .pipe(
        tap(result => {
          console.log(result), this.setCourseContent(result);
          this.authService.hideLoader();
        }),
        catchError(this.handleError<any>("Course enrollment"))
      );
  }
  completeModule(moduleId, module): Observable<any> {
    this.authService.showLoader();
    return this.http
      .post<any>("api/enrollment" + moduleId, JSON.stringify(module), {})
      .pipe(
        tap(result => {
          this.authService.hideLoader();
        }),
        catchError(this.handleError<any>("Course enrollment"))
      );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
