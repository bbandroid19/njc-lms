import { Component, OnInit } from "@angular/core";
import { RestserviceService } from "src/app/service/restservice.service";
import { CourseService } from "src/app/service/course/course.service";

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
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.restService.getCourses().subscribe(result => {
      this.courses = result;
      if (!result) {
        this.courses = [];
        this.courseService.getCoursesDummy().subscribe(res => {
          this.courses.push(res.course);
        });
      }

      this.isDataAvailable = true;
      console.log(this.courses);
    });
  }
}
