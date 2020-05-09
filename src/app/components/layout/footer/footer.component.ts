import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  footerMenu = [
    {
      title: "About Us",
      link: "/about-us"
    },
    {
      title: "Blog",
      link: "/blog"
    }
  ];

  menuLinks = [
    {
      title: "Programs",
      link: "/programs"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
