import { Component, OnInit } from '@angular/core';
import { RestserviceService } from 'src/app/service/restservice.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import swal from 'sweetalert2';
import { QuizService } from 'src/app/service/quiz/quiz.service';
import { CourseService } from 'src/app/service/course/course.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  enrolled= true;
  contentData = null;
  isDataAvailable:boolean = false;
  videoUrl="";
  childTitle:string = '';
  quizes=null;
  quizName=null;
  viewMode ='tab-overview';
  constructor(private restService: RestserviceService ,
              public sanitizer: DomSanitizer, private _authService: AuthService,
              private quizService: QuizService, private courseService: CourseService) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[4].id;
    this.courseService.getCourseContent(this.quizName).subscribe(
      (result) =>{
        console.log(result);
        this.contentData=result.course;
        this.courseService.courseContent= this.contentData;
        this.isDataAvailable = true;
        // this.childTitle=this.contentData[0].name;
        console.log(this.contentData);
      }
    )
  }

}
