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
  enrollments = null;
  constructor(
    private commonService: CommonService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.enrollments = this.commonService.getEnrollment();
  }
}
