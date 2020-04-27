import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { QuizService } from "./service/quiz/quiz.service";
import { LoaderService } from "./service/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "njc-lms";
  constructor(
    public _authService: AuthService,
    public quizService: QuizService,
    public loaderService: LoaderService
  ) {}
}
