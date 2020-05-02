import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import swal from "sweetalert2";
import { AuthService } from "src/app/auth.service";
import { LoaderService } from "../loader.service";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courseContent = null;
  editedCourse = null;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  completeStep(obj, id): Observable<any> {
    this.loaderService.showLoader();
    return this.http.put<any>("/enrollment/" + id, obj).pipe(
      tap(result => {
        this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>("complete step error"))
    );
  }
  getCourseContent(url): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get<any>("/courses?=", {}).pipe(
      tap(result => {
        this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  setCourseContent(content) {
    this.courseContent = content;
  }

  getCourses(): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get<any>("/courses", {}).pipe(
      tap(result => {
        this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  enrollCourse(courseId): Observable<any> {
    this.loaderService.showLoader();
    return this.http
      .post<any>("/enrollment/course/" + courseId, JSON.stringify({}))
      .pipe(
        tap(result => {
          console.log(result);
          this.loaderService.hideLoader();
        }),
        catchError(this.handleError<any>("Course enrollment"))
      );
  }
  getEnrollment(): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get<any>("/enrollments").pipe(
      tap(result => {
        this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>("Get enrollment"))
    );
  }
  completeModule(moduleId, module): Observable<any> {
    this.loaderService.showLoader();
    return this.http
      .post<any>("/enrollment" + moduleId, JSON.stringify(module), {})
      .pipe(
        tap(result => {
          this.loaderService.hideLoader();
        }),
        catchError(this.handleError<any>("Course enrollment"))
      );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.loaderService.hideLoader();
      swal
        .fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message,
          footer: "<a href>Why do I have this issue?</a>"
        })
        .then(() => {});
      console.error(error);
      return of(result as T);
    };
  }
}
