import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { SafSelectionComponent } from './saf-selection/saf-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentInfoComponent,
    StudentDetailsComponent,
    StudentCoursesComponent,
    SafSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
