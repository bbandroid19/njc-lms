import { Component, OnInit } from "@angular/core";
import { RestserviceService } from "src/app/service/restservice.service";
import { CourseService } from "src/app/service/course/course.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"]
})
export class CoursesComponent implements OnInit {
  childTitle: string = "Courses";
  courses = null;
  isDataAvailable = false;
  constructor(
    public restService: RestserviceService,
    public courseService: CourseService,
    public router: Router
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(result => {
      if (result) {
        this.courses = result.courses;
        this.courseService.courseContent = result.courses;
        this.isDataAvailable = true;
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
}
