import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { QuizService } from "./service/quiz/quiz.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "njc-lms";
  constructor(
    private _authService: AuthService,
    private quizService: QuizService
  ) {}
}
