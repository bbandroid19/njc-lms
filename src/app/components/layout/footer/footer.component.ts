import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerMenu=[
    {
      title:'About Us',
      link:'/about-us',

    },
    {
      title:'Blog',
      link:'/blog',
      
    },
    {
      title:'Contact',
      link:'/contact',
      
    },{
      title:'Become a Teacher',
      link:'/teach',
      
    }
  ];

  menuLinks=[
    {
      title:'Courses',
      link:'/courses',

    },
    {
      title:'Events',
      link:'/events',
      
    },
    {
      title:'Gallery',
      link:'/gallery',
      
    },{
      title:'FAQs',
      link:'/faq',
      
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
