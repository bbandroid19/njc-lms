import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CourseService } from 'src/app/service/course/course.service';
@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class EditcourseComponent implements OnInit {
  htmlContent="";
  childTitle:string = 'Edit Courses';
  viewMode='general';
  selectedStep=null;
  courseContent;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.selectedStep = null;
    this.htmlContent= "sdsdsds";
    this.courseContent= this.courseService.courseContent;
    this.courseService.getCourseContent('data/mulesoft-course.json').subscribe(
      (result) =>{
        console.log(result);
        this.courseService.courseContent= result.course;
        this.courseContent= result.course;
        this.selectedStep = this.courseContent.phases[0].modules[0].steps[0];
        console.log(this.courseContent);

      }
    )
  }
  addStep(module){
    console.log(module);
  }
  addModule(phase){
    console.log(phase);
  }
  addPhase(){
    console.log('ds');
  }
}
