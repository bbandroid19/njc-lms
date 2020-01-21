import { Component, OnInit } from '@angular/core';
import { RestserviceService } from 'src/app/service/restservice.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  childTitle:string = 'Courses';
  courses=null;
  isDataAvailable = false;
  constructor(private restService: RestserviceService) { }

  ngOnInit() {
    this.restService.getCourses().subscribe(
      (result) =>{
        this.courses=result;
        this.isDataAvailable = true;
        console.log(this.courses);
      }
    )
  }
}
