import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  constructor() {}
  isloader = false;
  showLoader() {
    this.isloader = true;
  }
  hideLoader() {
    this.isloader = false;
  }
}
