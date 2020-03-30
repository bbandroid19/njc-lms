import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
    private http: HttpClient,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}
  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: "data/javascript.json", name: "JavaScript" },
      { id: "data/aspnet.json", name: "Asp.Net" },
      { id: "data/csharp.json", name: "C Sharp" },
      { id: "data/designPatterns.json", name: "Design Patterns" },
      { id: "data/mulesoft-course.json", name: "Mulesoft" }
    ];
  }

  startTest() {
    swal
      .fire({
        title: "<strong>Start Course?</strong>",
        icon: "info",
        html: "Do you want to  <b>start course?</b>, ",
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
    return this.http
      .put<any>("api/tests/" + testId + "/evaluation", JSON.stringify(quizObj))
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
        "api/tests/enrollment/" + enrollmentId + "/module/" + moduleId,
        JSON.stringify(obj)
      )
      .pipe(
        tap(result => {
          this.loaderService.hideLoader();
        }),
        catchError(this.handleError<any>("Course enrollment"))
      );
  }
  getTestQuestions(quizId): Observable<any> {
    // return this.http.get("data/mulesoft-questions.json");
    this.loaderService.showLoader();
    return this.http.get<any>("api/questions?ids=" + quizId, {}).pipe(
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
