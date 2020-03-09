import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidemenuComponent } from './components/layout/sidemenu/sidemenu.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/layout/home/home.component';
import { FormsComponent } from './components/layout/forms/forms.component';
import { LoginComponent } from './components/layout/login/login.component';
import { RegisterComponent } from './components/layout/register/register.component';
import { BottomfooterComponent } from './components/layout/bottomfooter/bottomfooter.component';
import { CoursesComponent } from './components/sites/courses/courses.component';
import { MembershipComponent } from './components/sites/membership/membership.component';
import { AboutComponent } from './components/sites/about/about.component';
import { FaqComponent } from './components/sites/faq/faq.component';
import { ErrorComponent } from './components/layout/error/error.component';
import { ContactComponent } from './components/sites/contact/contact.component';
import { SubscribeComponent } from './components/layout/subscribe/subscribe.component';
import { ContentComponent } from './components/sites/content/content.component';
import { RestserviceService } from './service/restservice.service';
import { SubheaderComponent } from './components/layout/subheader/subheader.component';
import { LoaderComponent } from './components/layout/loader/loader.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { CommonService } from './service/common.service';
import { ProfileComponent } from './components/sites/profile/profile.component';
import { TestComponent } from './components/layout/test/test.component';
import { ManagecourseComponent } from './components/sites/admin/managecourse/managecourse.component';
import { ManagequestionComponent } from './components/sites/admin/managequestion/managequestion.component';
import {

  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,

} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditcourseComponent} from './components/sites/admin/editcourse/editcourse.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    FooterComponent,
    HomeComponent,
    FormsComponent,
    LoginComponent,
    RegisterComponent,
    BottomfooterComponent,
    CoursesComponent,
    MembershipComponent,
    AboutComponent,
    FaqComponent,
    ErrorComponent,
    ContactComponent,
    SubscribeComponent,
    ContentComponent,
    SubheaderComponent,
    LoaderComponent,
    ProfileComponent,
    TestComponent,
    ManagecourseComponent,
    ManagequestionComponent,
    EditcourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule, FormsModule,
    MatBadgeModule, MatBottomSheetModule, MatButtonModule, BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    MatTreeModule,
    AngularEditorModule,
    DragDropModule
  ],
  providers: [RestserviceService, AuthGuard, CommonService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
