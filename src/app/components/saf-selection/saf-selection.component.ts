import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Apihelpers } from '../humber-cgkr/api-helpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-saf-selection',
  templateUrl: './saf-selection.component.html',
  styleUrls: ['./saf-selection.component.css'],
})
export class SafSelectionComponent implements OnInit {
  call: Apihelpers;
  // @ViewChild('commentsInput') commentsInput!: ElementRef;
  constructor(private router: Router, private http: HttpClient) {
    this.call = new Apihelpers(http);
  }

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
  };

  onSubmit() {
    // console.log('Academic Standing Change:', this.formData.academicStandingChange);
    // console.log('Admissions:', this.formData.admissions);
    // console.log('Apply/Remove Holds:', this.formData.applyRemoveHolds);
    // console.log('Duplicate Person:', this.formData.duplicatePerson);
    // console.log('Grade Change:', this.formData.gradeChange);
    // console.log('Graduation:', this.formData.graduation);
    // console.log('Registration:', this.formData.registration);
    // console.log('Resume/Transfer:', this.formData.resumeTransfer);
    // console.log('Transcript Requests:', this.formData.transcriptRequests);
    // console.log('Withdraw from Current Program:', this.formData.withdrawFromCurrentProgram);
    // console.log('Other:', this.formData.other);
    // console.log('Authorized Leaves:', this.formData.authorizedLeaves);
    // console.log('Authorized Leaves:', this.formData.comments);
    // Collect selected options
    const selectedOptions = [];
    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key) && this.formData[key] === true) {
        selectedOptions.push(key);
      }
    }
    console.log('Selected options:', selectedOptions);
    const requestData = {
      summary: '2 - Custom Fields Ticket',
      description: '2 - Creating ticket with custom fields',
      registrarAction: selectedOptions.join(', '),
      registrarComment: this.formData.comments,
      components: 'Registration',
    };
    this.submitFormData(requestData).subscribe(
      (response) => {
        console.log('POST request successful', response);
      },
      (error) => {
        console.log('Error sending POST request', error);
      }
    );

    // // Send form data to server
    // this.http.post('https://send.com/post', this.formData).subscribe(
    //   (response) => {
    //     console.log('POST request successful', response);
    //   },
    //   (error) => {
    //     console.log('Error sending POST request', error);
    //   }
    // );
  }
  submitFormData(formData: any): Observable<any> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(`${environment.username}:${environment.pass}`),
      }),
    };

    return this.http.post(
      'http://localhost:8083/createTicket',
      formData,
      httpOptions
    );
  }
  ngOnInit(): void {}
}
