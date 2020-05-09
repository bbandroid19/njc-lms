import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { interval } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private _trialEndsAt;

  private _diff: number;
  private _days: number;
  private _hours: number;

  private _minutes: number;

  private _seconds: number;
  constructor() {}

  ngOnInit() {
    this._trialEndsAt = "2020-06-01";

    interval(30)
      .pipe(
        map(x => {
          this._diff =
            Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
        })
      )
      .subscribe(x => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
  }
  getDays(t) {
    console.log(this._days);
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }
}
