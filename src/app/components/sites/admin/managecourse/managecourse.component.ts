import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/service/course/course.service";
import { Router } from "@angular/router";
import { RestserviceService } from "src/app/service/restservice.service";

@Component({
  selector: "app-managecourse",
  templateUrl: "./managecourse.component.html",
  styleUrls: ["./managecourse.component.scss"]
})
export class ManagecourseComponent implements OnInit {
  childTitle: string = "Courses";
  courses = null;
  isDataAvailable = false;
  constructor(
    public restService: RestserviceService,
    public courseService: CourseService,
    public router: Router
  ) {}

  ngOnInit() {
    this.courses = [];
    this.courseService.getCourses().subscribe(result => {
      this.courses = result.courses;
      this.courseService.courseContent = result.courses[0];
      this.isDataAvailable = true;
      console.log(this.courses);
    });
  }
  editCourse() {
    this.courseService.editedCourse = this.courseService.courseContent;
    this.router.navigate(["/edit-course"]);
  }
}
