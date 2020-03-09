import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managecourse',
  templateUrl: './managecourse.component.html',
  styleUrls: ['./managecourse.component.scss']
})
export class ManagecourseComponent implements OnInit {

  constructor(private courseService: CourseService, private router: Router) { }
  courses=null;
  ngOnInit() {
    this.courses=[
      {
          "id": 1,
          "title": "Learning jQuery Mobile for Beginners",
          "author": "Basil Baby",
          "originalPrice":"$80.00",
          "actualrPrice":"$69.00",
          "description": "This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.",
          "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
          "imageUrl":"https://educationwp.thimpress.com/wp-content/uploads/2015/06/course-2-400x320.jpg",
          "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
      },
      {
          "id": 2,
          "title": "Become a PHP Master and Make Money",
          "author": "Hinata",
          "originalPrice":"$80.00",
          "actualrPrice":"$69.00",
          "description": "This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.",
          "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
          "imageUrl":"https://educationwp.thimpress.com/wp-content/uploads/2015/06/course-2-400x320.jpg",
          "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
      },
      {
          "id": 3,
          "title": "HTML5/CSS3 Essentials in 4-Hours",
          "author": "Inu Yasha",
          "originalPrice":"$80.00",
          "actualrPrice":"$69.00",
          "description": "This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.",
          "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
          "imageUrl":"https://educationwp.thimpress.com/wp-content/uploads/2015/06/course-2-400x320.jpg",
          "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
      },
      {
          "id": 4,
          "title": "The Art of Black and White Photography",
          "author": "Sachin",
          "originalPrice":"$80.00",
          "actualrPrice":"$69.00",
          "description": "This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.",
          "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
          "imageUrl":"https://educationwp.thimpress.com/wp-content/uploads/2015/06/course-2-400x320.jpg",
          "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
      },
      {
          "id": 5,
          "title": "Introduction to react for beginners",
          "author": "Honey Singh",
          "originalPrice":"$80.00",
          "actualrPrice":"$69.00",
          "description": "This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.",
          "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
          "imageUrl":"https://educationwp.thimpress.com/wp-content/uploads/2015/06/course-2-400x320.jpg",
          "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
      },{
          "id": 6,
          "title": "First post",
          "author": "Test",
          "originalPrice":"$80.00",
          "actualrPrice":"$69.00",
          "description": "This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.",
          "createdAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
          "imageUrl":"https://educationwp.thimpress.com/wp-content/uploads/2015/06/course-2-400x320.jpg",
          "updatedAt": "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)"
      }
  ];
  }
  editCourse(course){
    this.courseService.editedCourse= course;
    this.router.navigate(['/edit-course']);
  }
}
