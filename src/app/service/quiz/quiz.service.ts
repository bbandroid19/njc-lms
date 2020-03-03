import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  testStarted = false;
  constructor(private http: HttpClient) { }
  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/javascript.json', name: 'JavaScript' },
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' },
      { id: 'data/mulesoft-course.json', name: 'Mulesoft' }
    ];
  }

  startTest() {
    swal.fire('Are you sure?','Do you want to start the course?').then(
      () => {
        this.testStarted = true;
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('course-item-popup');
      }
    )
  }
  getTestQuestionIds(enrollmentId, moduleId): Observable<any>{
    return this.http.get('data/mulesoft-question-ids.json');
    // return this.http.get<any>('https://localhost:5000/tests/enrollment/'+enrollmentId+'/module/'+ moduleId,{

    // }).pipe(
    //   tap((result) => console.log(result)),
    //   catchError(this.handleError<any>('Course enrollment'))
    // );
  }
  getTestQuestions(quizId): Observable<any>{
    return this.http.get('data/mulesoft-questions.json');
    // return this.http.get<any>('https://localhost:5000/questions?ids='+ quizId,{

    // }).pipe(
    //   tap((result) => console.log(result)),
    //   catchError(this.handleError<any>('Course enrollment'))
    // );
  }
  stopTest() {
    this.testStarted = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('course-item-popup');
  }
  isTestStarted() {
    return this.testStarted;
  }
  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
