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
    private restService: RestserviceService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses = [];
    this.restService.getCourses().subscribe(result => {
      if (result) {
        this.courses.push(result.course);
        this.courseService.courseContent = result.course;
        this.isDataAvailable = true;
        console.log(this.courses);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
}
