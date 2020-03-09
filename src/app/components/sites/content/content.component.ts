import { Component, OnInit } from '@angular/core';
import { RestserviceService } from 'src/app/service/restservice.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import swal from 'sweetalert2';
import { QuizService } from 'src/app/service/quiz/quiz.service';
import { CourseService } from 'src/app/service/course/course.service';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations:[
    trigger('OpenInOut', [
      transition(':enter', [
        style({ display: 'none'}),
        animate('100ms', style({ display: 'block' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ display: 'none' }))
      ])
    ]),
  ]
})
export class ContentComponent implements OnInit {
  enrolled= false;
  contentData = null;
  isDataAvailable:boolean = false;
  videoUrl="";
  childTitle:string = '';
  quizes=null;
  quizName=null;
  enrolledCourse= null;
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
        this.courseService.getCourseCompletionState().subscribe(
            (completedState) =>{

            }
        );
        console.log(this.contentData);
      }
    )
  }
  enrollCourse(){
    this.courseService.enrollCourse(this.courseService.courseContent._id).subscribe(
      (result) => {
        if(!result){
          console.log(result);

          this.courseService.getCourseCompletionState().subscribe(

            (res) => {
              this.enrolledCourse = res;
              this.syncEnrollMent();
            }
          )
          // if get enrollment is not working fetching local data from project structure
        } else {
          this.enrolledCourse = result;
          this.syncEnrollMent();
        }
        this.enrolled = true;

      }
    )
  }
  ifCourseStarted(val){
    if(val == undefined){
      return false;
    }else{
      return true;
    }

  }
  syncEnrollMent(){
    if(this.enrolled){
      this.contentData.phases.forEach(
        (phase,i) =>{
          this.enrolledCourse.enrollment.phases.forEach(
            (phaseState, j) =>{
              if(phase.phase_id === phaseState.phase_id){
                phase.status= phaseState.status;
                phase.percentage_completed= phaseState.percentage_completed;
                phase.opened= false;
              }
            }
          );
          phase.modules.forEach(
            (module,k) =>{
              this.enrolledCourse.enrollment.modules.forEach(
                (modState, j) =>{
                  if(module.module_id === modState.module_id){
                    module.status = modState.status;
                    module.percentage_completed = modState.percentage_completed;
                    module.opened = false;
                  }
                });
            },
          );
        }
      );
    }
  }
}
