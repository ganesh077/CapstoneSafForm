import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { SafSelectionComponent } from './components/saf-selection/saf-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentInfoComponent,
    StudentDetailsComponent,
    StudentCoursesComponent,
    SafSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
