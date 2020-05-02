import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from "sweetalert2";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth.service";
import { LoaderService } from "../loader.service";
@Injectable({
  providedIn: "root"
})
export class QuizService {
  testStarted = false;
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public loaderService: LoaderService
  ) {}

  startTest() {
    swal
      .fire({
        title: "<strong>Start Course?</strong>",
        icon: "info",
        html: "Do you want to  <b>go to course?</b>, ",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes!',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
        cancelButtonAriaLabel: "Thumbs down"
      })
      .then(res => {
        if (res.value) {
          this.testStarted = true;
          const body = document.getElementsByTagName("body")[0];
          body.classList.add("course-item-popup");
        }
      });
  }
  evaluateTest(testId, quizObj) {
    console.log(quizObj);
    this.loaderService.showLoader();
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const options = { headers };
    return this.http
      .put<any>(
        "/tests/" + testId + "/evaluation",
        JSON.stringify(quizObj),
        options
      )
      .pipe(
        tap(result => {
          this.loaderService.hideLoader();
        }),
        catchError(this.handleError<any>("Evauation error"))
      );
  }
  getTestQuestionIds(enrollmentId, moduleId): Observable<any> {
    let obj = {};
    this.loaderService.showLoader();
    return this.http
      .post<any>(
        "/tests/enrollment/" + enrollmentId + "/module/" + moduleId,
        JSON.stringify(obj)
      )
      .pipe(
        tap(result => {
          this.loaderService.hideLoader();
        }),
        catchError(this.handleError<any>("Course enrollment"))
      );
  }
  getTestQuestions(qids): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get<any>("/questions?ids=" + qids, {}).pipe(
      tap(result => {
        this.loaderService.hideLoader();
      }),
      catchError(this.handleError<any>("Course enrollment"))
    );
  }
  stopTest() {
    this.testStarted = false;

    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("course-item-popup");
  }
  isTestStarted() {
    return this.testStarted;
  }
  public handleError<T>(operation = "operation", result?: T) {
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
