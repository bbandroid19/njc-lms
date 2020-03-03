import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  enrollments(courseId): Observable<any>{
    return this.http.get<any>('https://localhost:5000/enrollment',{

    }).pipe(
      tap((result) => console.log(result)),
      catchError(this.handleError<any>('Course enrollment'))
    );
  }
  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
