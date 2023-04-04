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
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private http: HttpClient
  ) {
    // Initialize Apihelpers class instance for API calls
    this.call = new Apihelpers(http);

    // Subscribe to actionsTaken observable to update actionsTaken array
    this.sharedService.actionsTaken$.subscribe((actions) => {
      this.actionsTaken = actions;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Initialize form data properties
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

  // Method called on authorizedLeaves checkbox change
  onAuthorizedLeavesChange() {
    this.authorizedLeavesEnabled = !this.authorizedLeavesEnabled;
  }

  // Method called on form submit
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
    // Iterate over the actionsTaken array and create a string describing the actions taken
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
    console.log('Selected options:', selectedOptions);

    // Create an object containing the data to be submitted in the POST request
    const requestData = {
      firstName: this.df.lastName + ', ' + this.df.firstName,
      description: this.df.humberId,
      registrarAction: selectedOptions.join(', '),
      // Add comments entered by the user and the result string describing the actions taken
      registrarComment:
        this.formData.comments + '\n' + resultString + authorizedLeavesReason,
      components: 'Registration', // Hardcode components as "Registration" as per the requirements
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
}
