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
  courses = [
    { name: 'Course 1', code: 'CSE101' },
    { name: 'Course 2', code: 'CSE102' },
    { name: 'Course 3', code: 'CSE103' },
    { name: 'Course 4', code: 'CSE104' },
    { name: 'Course 5', code: 'CSE105' },
  ]; 
  dropDetails: { courseCode: string; crn: string }[] = [];
  selectedActions: {
    action: string;
    disabled: boolean;
  }[] = Array.from({ length: this.courses.length }, () => ({
    action: 'Choose one',
    newCrn: '',
    newCourseCode: '',
    disabled: true,
  }));

  handleDrop(index: number): void {
    this.selectedActions[index] = {
      action: 'Drop',
      disabled: true,
    };
    console.log(this.selectedActions);
  }

  handleTransfer(index: number): void {
    this.selectedActions[index] = {
      action: 'Transfer',

      disabled: false,
    };
    console.log(this.selectedActions);
  }

  actionsTaken: any[] = [];
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
    // if (action === 'drop') {
    //   this.selectedActions[index].newCrn = oldCrn;
    //   this.selectedActions[index].newCourseCode = oldCourseCode;
    // }

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
    // handle the transfer submit logic here
  }
  deleteAction(index: number): void {
    this.actionsTaken.splice(index, 1);
    this.sharedService.updateActionsTaken(this.actionsTaken);
    console.log('Afer removing: ', this.actionsTaken);
  }

  ngOnInit(): void {}
}
