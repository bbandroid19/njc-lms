import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/layout/home/home.component";
import { FormsComponent } from "./components/layout/forms/forms.component";
import { RegisterComponent } from "./components/layout/register/register.component";
import { LoginComponent } from "./components/layout/login/login.component";
import { CoursesComponent } from "./components/sites/courses/courses.component";
import { MembershipComponent } from "./components/sites/membership/membership.component";
import { from } from "rxjs";
import { AboutComponent } from "./components/sites/about/about.component";
import { FaqComponent } from "./components/sites/faq/faq.component";
import { ErrorComponent } from "./components/layout/error/error.component";
import { ContentComponent } from "./components/sites/content/content.component";
import { AuthGuard } from "./auth.guard";
import { ProfileComponent } from "./components/sites/profile/profile.component";
import { TestComponent } from "./components/layout/test/test.component";
import { ManagecourseComponent } from "./components/sites/admin/managecourse/managecourse.component";
import { AdminGuard } from "./admin.guard";
import { EditcourseComponent } from "./components/sites/admin/editcourse/editcourse.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "login",
    component: LoginComponent
  },
  { path: "programs", component: CoursesComponent, canActivate: [AuthGuard] },
  { path: "membership", component: MembershipComponent },
  { path: "about-us", component: AboutComponent },
  { path: "faq", component: FaqComponent },
  { path: "not-found", component: ErrorComponent, canActivate: [AuthGuard] },
  { path: "content", component: ContentComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "tests", component: TestComponent, canActivate: [AuthGuard] },
  {
    path: "manage-course",
    component: ManagecourseComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "edit-course",
    component: EditcourseComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
