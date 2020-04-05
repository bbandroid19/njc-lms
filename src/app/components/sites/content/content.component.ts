import { Component, OnInit } from "@angular/core";
import { RestserviceService } from "src/app/service/restservice.service";
import { SafeUrl } from "@angular/platform-browser";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "src/app/auth.service";
import swal from "sweetalert2";
import { QuizService } from "src/app/service/quiz/quiz.service";
import { CourseService } from "src/app/service/course/course.service";
import { trigger, transition, animate, style } from "@angular/animations";
import { CommonService } from "src/app/service/common.service";
@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  animations: [
    trigger("OpenInOut", [
      transition(":enter", [
        style({ display: "none" }),
        animate("100ms", style({ display: "block" }))
      ]),
      transition(":leave", [animate("100ms", style({ display: "none" }))])
    ])
  ]
})
export class ContentComponent implements OnInit {
  enrolled = false;
  contentData = null;
  isDataAvailable: boolean = false;
  videoUrl = "";
  childTitle: string = "";
  quizes = null;
  quizName = null;
  enrolledCourse = null;
  viewMode = "tab-overview";
  constructor(
    private restService: RestserviceService,
    public sanitizer: DomSanitizer,
    private _authService: AuthService,
    private quizService: QuizService,
    private courseService: CourseService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    // this.quizes = this.quizService.getAll();
    // this.quizName = this.quizes[4].id;
    this.enrolledCourse = this.commonService.getEnrollment()[0];
    if (!this.enrolledCourse) {
      this.courseService.getEnrollment().subscribe(result => {
        this.enrolledCourse = result.enrollments[0];
      });
    }
    console.log(this.enrolledCourse);
    this.contentData = this.courseService.courseContent[0];
    this.isDataAvailable = true;
    this.checkEnrolled();
  }
  checkEnrolled() {
    if (this.enrolledCourse) {
      this.enrolled = this.enrolledCourse.course_id === this.contentData._id;
      this.syncEnrollMent();
    }
  }
  enrollCourse() {
    this.courseService.enrollCourse(this.contentData._id).subscribe(result => {
      if (result) {
        console.log(result);
        this.enrolledCourse = result.enrollment;
        this.commonService.setEnrollment([this.enrolledCourse]);
        this.enrolled = true;
        this.syncEnrollMent();
      }
    });
  }
  goToCourse() {
    if (this.enrolled) {
      this.quizService.startTest();
    }
  }
  ifCourseStarted(val) {
    return val !== undefined;
  }
  syncEnrollMent() {
    if (this.enrolled) {
      this.contentData.phases.forEach((phase, i) => {
        this.enrolledCourse.phases.forEach((phaseState, j) => {
          if (phase.phase_id === phaseState.phase_id) {
            phase.status = phaseState.status;
            phase.percentage_completed = phaseState.percentage_completed;

            phase.opened = false;
          }
        });
        phase.modules.forEach((module, k) => {
          this.enrolledCourse.modules.forEach((modState, j) => {
            if (module.module_id === modState.module_id) {
              module.status = modState.status;
              module.percentage_completed = modState.percentage_completed;

              module.opened = false;
            }
          });
          module.steps.forEach((step, k) => {
            this.enrolledCourse.steps.forEach((stepState, k) => {
              if (step.step_id === stepState.step_id) {
                step.status = stepState.status;
                step.percentage_completed = stepState.percentage_completed;
                step.opened = false;
              }
            });
          });
        });
      });
      this.commonService.setEnrollment([this.enrolledCourse]);
      this.courseService.courseContent[0] = this.contentData;
      console.log(this.contentData);
    }
  }
}
