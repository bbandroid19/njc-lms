import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class CourseService {
  courseContent = null;
  editedCourse = null;
  constructor(private http: HttpClient) {}
  getCoursesDummy(): Observable<any> {
    return this.http.get("data/mulesoft-course.json");
  }
  completeStep(obj, id): Observable<any> {
    return this.http.post<any>("api/enrollment/" + id, obj).pipe(
      tap(result => console.log(result)),
      catchError(this.handleError<any>("complete step error"))
    );
  }
  getCourseContent(url): Observable<any> {
    return this.http.get(url);
    // return this.http.get<any>("api/courses?=", {}).pipe(
    //   tap(result => console.log(result)),
    //   catchError(this.handleError<any>("getCourseContetn"))
    // );
  }
  setCourseContent(content) {
    this.courseContent = content;
  }
  getCourseCompletionState(): Observable<any> {
    return this.http.get("data/mulesoft-course-completed.json");
    // return this.http.get<any>('https://localhost:5000/courses',{

    // }).pipe(
    //   tap((result) => console.log(result)),
    //   catchError(this.handleError<any>('getCourseContetn'))
    // );
  }
  getCourses(): Observable<any> {
    return this.http.get<any>("api/courses", {}).pipe(
      tap(result => console.log(result)),
      catchError(this.handleError<any>("getCourseContetn"))
    );
  }
  enrollCourse(courseId): Observable<any> {
    return this.http.get<any>("api/enrollment/course/" + courseId, {}).pipe(
      tap(result => {
        console.log(result), this.setCourseContent(result);
      }),
      catchError(this.handleError<any>("Course enrollment"))
    );
  }
  completeModule(moduleId, module): Observable<any> {
    return this.http
      .post<any>("api/enrollment" + moduleId, JSON.stringify(module), {})
      .pipe(
        tap(result => console.log(result)),
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
