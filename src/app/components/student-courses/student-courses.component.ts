import { Component, OnInit } from '@angular/core';
import { SharedService } from '../humber-cgkr/service-helpers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
})
export class StudentCoursesComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  // courses array containing course name and code
  courses = [
    { name: 'Course 1', code: 'CSE101' },
    { name: 'Course 2', code: 'CSE102' },
    { name: 'Course 3', code: 'CSE103' },
    { name: 'Course 4', code: 'CSE104' },
    { name: 'Course 5', code: 'CSE105' },
  ];

  // dropDetails array for holding information about the dropped courses
  dropDetails: { courseCode: string; crn: string }[] = [];

  // selectedActions array for holding information about selected actions and their state
  selectedActions: {
    action: string;
    disabled: boolean;
  }[] = Array.from({ length: this.courses.length }, () => ({
    action: 'Choose one',
    newCrn: '',
    newCourseCode: '',
    disabled: true,
  }));

  // handle drop action
  handleDrop(index: number): void {
    this.selectedActions[index] = {
      action: 'Drop',
      disabled: true,
    };
    console.log(this.selectedActions);
  }

  // handle transfer action
  handleTransfer(index: number): void {
    this.selectedActions[index] = {
      action: 'Transfer',
      disabled: false,
    };
    console.log(this.selectedActions);
  }

  // handle add course submit
  handleAddSubmit(courseCode: string, crn: string): void {
    const actionData = {
      action: 'Add',
      oldCourseCode: courseCode,
      oldCrn: crn,
      newCourseCode: courseCode,
      newCrn: crn,
    };
    this.actionsTaken.push(actionData);
    this.sharedService.updateActionsTaken(this.actionsTaken);
  }

  // array to hold information about the actions taken
  actionsTaken: any[] = [];

  // handle transfer submit
  handleTransferSubmit(
    action: string,
    newCrn: string,
    newCourseCode: string,
    oldCrn: string,
    oldCourseCode: string
  ): void {
    newCrn = newCrn !== '' && newCrn !== undefined ? newCrn : 'NA';
    newCourseCode =
      newCourseCode !== '' && newCourseCode !== undefined
        ? newCourseCode
        : 'NA';

    console.log(
      'Action submitted:',
      action,
      newCrn,
      newCourseCode,
      oldCrn,
      oldCourseCode
    );
    const actionData = {
      action,
      oldCrn,
      newCrn,
      oldCourseCode,
      newCourseCode,
    };
    this.actionsTaken.push(actionData);
    console.log(this.actionsTaken);
    this.sharedService.updateActionsTaken(this.actionsTaken);
  }

  // delete action from the list of actions taken
  deleteAction(index: number): void {
    this.actionsTaken.splice(index, 1);
    this.sharedService.updateActionsTaken(this.actionsTaken);
    console.log('Afer removing: ', this.actionsTaken);
  }

  ngOnInit(): void {}
}
