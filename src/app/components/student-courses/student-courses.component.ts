import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  courses = [
    { name: 'Course 1', code: 'CSE101' },
    { name: 'Course 2', code: 'CSE102' },
    { name: 'Course 3', code: 'CSE103' },
    { name: 'Course 4', code: 'CSE104' },
    { name: 'Course 5', code: 'CSE105' },
  ];
  dropDetails: { courseCode: string, crn: string }[] = [];
  selectedActions: string[] = [];

  // transferOptions = [
  //   { name: 'Transfer to another section', value: 'transfer' },
  //   { name: 'Drop the course', value: 'drop' },
  //   { name: 'Do nothing', value: 'none' },
  // ];
  constructor() { }

  ngOnInit(): void {
  }

}
