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
    private restService: RestserviceService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses = [];
    this.restService.getCourses().subscribe(result => {
      this.courses.push(result.course);
      this.courseService.courseContent = result.course;
      this.isDataAvailable = true;
      console.log(this.courses);
    });
  }
  editCourse() {
    this.courseService.editedCourse = this.courseService.courseContent;
    this.router.navigate(["/edit-course"]);
  }
}
