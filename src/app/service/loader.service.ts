import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  constructor() {}
  private _isLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  public isLoaderObs: Observable<
    boolean
  > = this._isLoaderSubject.asObservable();
  showLoader() {
    this._isLoaderSubject.next(true);
  }
  hideLoader() {
    this._isLoaderSubject.next(false);
  }
}
