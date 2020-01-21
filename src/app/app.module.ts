import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    SubheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
