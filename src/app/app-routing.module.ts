import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/layout/home/home.component';
import {FormsComponent} from './components/layout/forms/forms.component';
import {RegisterComponent} from './components/layout/register/register.component';
import {LoginComponent} from './components/layout/login/login.component';
import {CoursesComponent} from './components/sites/courses/courses.component';
import {MembershipComponent} from './components/sites/membership/membership.component';
import { from } from 'rxjs';
import { AboutComponent } from './components/sites/about/about.component';
import { FaqComponent } from './components/sites/faq/faq.component';
import { ErrorComponent } from './components/layout/error/error.component';


const routes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'login', component: LoginComponent },
{ path: 'courses', component: CoursesComponent },
{ path: 'membership', component: MembershipComponent },
{ path: 'about-us', component: AboutComponent },
{ path: 'faq', component: FaqComponent},
{ path: 'not-found', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
