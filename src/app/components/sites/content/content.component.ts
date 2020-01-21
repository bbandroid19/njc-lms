import { Component, OnInit } from '@angular/core';
import { RestserviceService } from 'src/app/service/restservice.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  contentData=null;
  isDataAvailable:boolean = false;
  videoUrl="";
  childTitle:string = '';
  constructor(private restService: RestserviceService ,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.restService.getCourseContent().subscribe(
      (result) =>{
        this.contentData=result;
        this.isDataAvailable = true;
        this.childTitle=this.contentData[0].title;
        console.log(this.contentData);
      }
    )
  }

}
