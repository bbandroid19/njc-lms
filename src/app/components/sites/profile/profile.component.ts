import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/service/common.service";
import { CourseService } from "src/app/service/course/course.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  viewMode = "course";
  settings = "biographical";
  userData = null;
  userId = "";
  enrollments = null;
  constructor(
    private commonService: CommonService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.enrollments = this.commonService.getEnrollment();
    this.userData = JSON.parse(localStorage.getItem("userData")).data;
    this.courseService.getEnrollment().subscribe(result => {
      if (result && result.enrollments) {
        this.enrollments = result.enrollments;
        this.userId = result.enrollments[0].user_id;
      }
    });
    console.log(this.userData);
  }
}
