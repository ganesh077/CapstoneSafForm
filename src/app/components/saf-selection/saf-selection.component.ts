import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Apihelpers } from '../humber-cgkr/api-helpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../humber-cgkr/service-helpers';
import { Datahelper } from '../humber-cgkr/data-helpers';
@Component({
  selector: 'app-saf-selection',
  templateUrl: './saf-selection.component.html',
  styleUrls: ['./saf-selection.component.css'],
})
export class SafSelectionComponent implements OnInit {
  call: Apihelpers;
  actionsTaken: any[] = [];
  @Input() df: Datahelper;
  successMessage: string;
  failureMessage: string;
  // @ViewChild('commentsInput') commentsInput!: ElementRef;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private http: HttpClient
  ) {
    this.call = new Apihelpers(http);

    this.sharedService.actionsTaken$.subscribe((actions) => {
      this.actionsTaken = actions;
    });
  }
  authorizedLeavesEnabled = false;
  formData = {
    comments: '',
    academicStandingChange: false,
    admissions: false,
    applyRemoveHolds: false,
    duplicatePerson: false,
    gradeChange: false,
    graduation: false,
    registration: false,
    resumeTransfer: false,
    transcriptRequests: false,
    withdrawFromCurrentProgram: false,
    other: false,
    authorizedLeaves: false,
    authorizedLeavesOptions: '',
  };
  onAuthorizedLeavesChange() {
    this.authorizedLeavesEnabled = !this.authorizedLeavesEnabled;
  }
  onSubmit() {
    let authorizedLeavesReason = '';
    if (this.formData.authorizedLeaves) {
      authorizedLeavesReason =
        'Reason for leave: ' + this.formData.authorizedLeavesOptions;
    }

    const selectedOptions = [];
    console.log('inside saf', this.actionsTaken);
    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key) && this.formData[key] === true) {
        selectedOptions.push(key);
      }
    }
    let resultString = '';
    this.actionsTaken.forEach((obj) => {
      if (obj.action === 'Drop') {
        resultString += `${obj.action} '${obj.oldCourseCode}' \n`;
      } else if (obj.action === 'Transfer') {
        resultString += `${obj.action} ${obj.oldCourseCode} to ${obj.newCourseCode} \n`;
      } else if (obj.action === 'Add') {
        resultString += `${obj.action} '${obj.newCourseCode}' \n`;
      } else if (obj.action === 'Change') {
        resultString += `${obj.action} '${obj.oldCourseCode}' to '${obj.newCourseCode}' \n`;
      }
    });
    console.log(resultString);

    const actionsTakenString = this.actionsTaken.join(', ');
    console.log(actionsTakenString);
    console.log('Selected options:', selectedOptions);
    const requestData = {
      firstName: this.df.lastName + ', ' + this.df.firstName,
      description: this.df.humberId,
      registrarAction: selectedOptions.join(', '),
      registrarComment:
        this.formData.comments + '\n' + resultString + authorizedLeavesReason,
      components: 'Registration',
    };

    this.call.submitFormData(requestData).subscribe(
      (response) => {
        console.log('POST request successful', response);
        this.successMessage = 'Ticket created successfully!';
        this.failureMessage = '';
      },
      (error) => {
        console.log('Error sending POST request', error);
        this.successMessage = '';
        this.failureMessage = 'Failed to create the ticket. Please try again.';
      }
    );
    console.log(requestData);
  }
  ngOnInit(): void {}
}
