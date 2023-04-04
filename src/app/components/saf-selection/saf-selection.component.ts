import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Apihelpers } from '../humber-cgkr/api-helpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

    // const actionArray = this.actionsTaken.map((obj) => Object.values(obj));
    // console.log(actionArray);

    const actionsTakenString = this.actionsTaken.join(', ');
    console.log(actionsTakenString);
    console.log('Selected options:', selectedOptions);
    const requestData = {
      summary: this.df.lastName + ', ' + this.df.firstName,
      description: this.df.humberId,
      registrarAction: selectedOptions.join(', '),
      registrarComment:
        this.formData.comments + '\n' + resultString + authorizedLeavesReason,
      components: 'Registration',
    };
    this.call.submitFormData(requestData).subscribe(
      (response) => {
        console.log('POST request successful', response);
      },
      (error) => {
        console.log('Error sending POST request', error);
      }
    );
    console.log(requestData);
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
  // submitFormData(formData: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization:
  //         'Basic ' + btoa(`${environment.username}:${environment.pass}`),
  //     }),
  //   };

  //   return this.http.post(
  //     'http://ec2-3-208-6-206.compute-1.amazonaws.com:8083/createTicket',
  //     formData,
  //     httpOptions
  //   );
  // }
  ngOnInit(): void {}
}
