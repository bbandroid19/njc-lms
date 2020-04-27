import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class StudentService {}
