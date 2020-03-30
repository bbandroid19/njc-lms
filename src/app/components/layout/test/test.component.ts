import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth.service";
import { Option, Question, Quiz, QuizConfig } from "../../../models/index";
import { QuizService } from "src/app/service/quiz/quiz.service";
import { CourseService } from "src/app/service/course/course.service";
import swal from "sweetalert2";
import { CommonService } from "src/app/service/common.service";
@Component({
  selector: "app-test",
  animations: [
    trigger("openClose", [
      state("true", style({ left: "0px" })),
      state("false", style({ left: "-400px" })),
      transition("false <=> true", animate(498))
    ]),
    trigger("openCloseLeft", [
      state("true", style({ left: "400px" })),
      state("false", style({ left: "0px" })),
      transition("false <=> true", animate(500))
    ])
  ],
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"]
})
export class TestComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = "quiz";
  quizName: string;
  config: QuizConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: false, // if true, it will move to next question automatically when answered.
    duration: 600, // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    pageSize: 1,
    requiredAll: false, // indicates if you must answer all the questions before submitting.
    richText: false,
    shuffleQuestions: true,
    shuffleOptions: false,
    showClock: false,
    showPager: true,
    theme: "none"
  };
  moduleContent = null;
  textContent =
    "hskjdhjksdhskjdhsakjdhskjdhskjdhsakjdhsakjdhskjdhsajkdhskjahdsakjhdskajhdskjh";
  videContent = "https://www.youtube.com/embed/ifc67JexW28";
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = "00:00";
  duration = "";
  isOpen = true;
  testData = [];
  currentQuestion = null;
  testIndex = 0;
  testStarted = false;
  courseContent = null;
  phaseIndex = 0;
  moduleIndex = 0;
  stepsIndex = 0;
  currentIndex = 0;
  enrollment = null;
  constructor(
    private _authService: AuthService,
    private quizService: QuizService,
    private courseService: CourseService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.courseContent = this.courseService.courseContent;
    this.moduleContent = this.courseContent.phases[0].modules[0].steps[0];
    this.enrollment = this.commonService.getEnrollment()[0];
  }
  startQuiz(moduleId) {
    this.testStarted = true;
    this.loadQuiz(this.quizName, moduleId);
  }
  loadQuiz(quizName: string, moduleId: string) {
    this.quizService
      .getTestQuestionIds(this.enrollment._id, moduleId)
      .subscribe(res => {
        console.log(res);
        let quizId = res.quiz_id;
        this.startTime = new Date();
        this.ellapsedTime = "00:00";
        this.timer = setInterval(() => {
          this.tick();
        }, 1000);
        this.duration = this.parseTime(this.config.duration);
        let qids = "";

        res.test.answers.forEach((q, i) => {
          i += 1;
          if (i === Object.keys(res.test.answers).length) {
            qids = qids.substring(1, qids.length - 1);
          } else {
            qids += q.question_id + ", ";
          }
        });
        console.log(qids);
        // this.quiz = new Quiz(res);
        this.quizService.getTestQuestions(qids).subscribe(questions => {
          console.log(questions);
          questions.id = res.test.quiz_id;
          this.quiz = new Quiz(questions);
          this.pager.count = this.quiz.questions.length;
        });
      });
    this.mode = "quiz";
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? "0" : "") + mins;
    secs = (secs < 10 ? "0" : "") + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return this.quiz.questions
      ? this.quiz.questions.slice(
          this.pager.index,
          this.pager.index + this.pager.size
        )
      : [];
  }

  onSelect(question: Question, option: Option) {
    question.options.forEach(x => {
      console.log(x);
      if (x.selected === true) {
        question.selected_answer = x.name;
      }
      console.log(option);
      if (x.id !== option.id) x.selected = false;
    });

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  completeModule(moduleId) {
    let module = {
      categories: [
        {
          category: "step",
          category_id: "5e53d7a0eb05af1cbb0a6987",
          status: "completed"
        }
      ]
    };
    this.courseService.completeModule(moduleId, module).subscribe(result => {
      console.log(result);
    });
  }
  quizComplete() {}
  nextModule() {
    if (
      this.stepsIndex > this.courseContent.phases[0].modules[0].steps.length
    ) {
      this.stepsIndex = 0;
      this.moduleIndex++;
    } else {
      this.stepsIndex++;
    }
    if (this.moduleIndex > this.courseContent.phases[0].modules.length) {
      this.stepsIndex = 0;
      this.moduleIndex = 0;
      this.phaseIndex++;
    } else {
      this.moduleIndex++;
    }
    this.moduleChange(
      this.phaseIndex,
      this.moduleContent,
      this.stepsIndex,
      null
    );
    console.log("next");
  }
  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = "quiz";
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? "Answered" : "Not Answered";
  }

  isCorrect(question: Question) {
    return question.options.some(x => x.selected === x.isAnswer)
      ? "correct"
      : "wrong";
  }

  moduleChange(phaseIndex, moduleIndex, stepsIndex, steps) {
    this.phaseIndex = phaseIndex;
    this.moduleIndex = moduleIndex;
    this.stepsIndex = stepsIndex;
    if (steps.step_type === "text") {
      steps.content = this.textContent;
    } else {
      steps.content = this.videContent;
    }
    this.moduleContent = this.courseContent.phases[phaseIndex].modules[
      moduleIndex
    ].steps[stepsIndex];
    console.log(this.moduleContent);
  }
  onSubmit() {
    let answerObj = {
      quiz_id: this.quiz.id,
      anwers: []
    };
    let answers = [];
    this.quiz.questions.forEach(x =>
      answers.push({
        question_id: x.id,
        selected_answers: x.selected_answer
      })
    );
    answerObj.anwers = answers;
    console.log(answers);
    this.quizService
      .evaluateTest(
        this.enrollment._id,
        this.courseContent.phases[this.phaseIndex].modules[this.moduleIndex]
          .module_id,
        answerObj
      )
      .subscribe(res => {
        console.log(res);
      });
    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = "result";
  }
  completeStep() {
    let completeObj = {
      categories: [
        {
          category: "",
          category_id: "",
          status: "completed"
        }
      ]
    };
    this.courseContent.phases[this.phaseIndex].modules[this.moduleIndex].steps[
      this.stepsIndex
    ].completed = true;
    completeObj.categories[0].category = "step";
    completeObj.categories[0].category_id = this.courseContent.phases[
      this.phaseIndex
    ].modules[this.moduleIndex].steps[this.stepsIndex].step_id;
    this.courseService
      .completeStep(completeObj, this.enrollment._id)
      .subscribe(res => {
        console.log("complete");
      });
    let steps = this.courseContent.phases[this.phaseIndex].modules[
      this.moduleIndex
    ].steps;
    let stepsCompleted = 0;
    steps.forEach((step, i) => {
      if (step.completed) {
        stepsCompleted++;
      }
    });
    if (stepsCompleted === steps.length) {
      this.courseContent.phases[this.phaseIndex].modules[
        this.moduleIndex
      ].completed = true;
      completeObj.categories[0].category = "module";
      completeObj.categories[0].category_id = this.courseContent.phases[
        this.phaseIndex
      ].modules[this.moduleIndex].module_id;
      this.courseService
        .completeStep(completeObj, this.enrollment._id)
        .subscribe(res => {
          console.log("complete");
        });
    }
  }
  isComplete() {
    this.courseContent.phases[this.phaseIndex].modules[this.moduleIndex].steps[
      this.stepsIndex
    ].completed;
  }
}
