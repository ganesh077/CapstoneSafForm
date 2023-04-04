import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Apihelpers } from './components/humber-cgkr/api-helpers';
import { HttpClient } from '@angular/common/http';
import { Datahelper } from './components/humber-cgkr/data-helpers';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  inputFieldValue: string;
  private queryParamsSubscription: Subscription;
  @Input() name: string;
  value: string;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  call: Apihelpers;
  dh: Datahelper;
  private _arr: String[] = [];
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.call = new Apihelpers(http);
    // this.call.fetchStudent('N01498359');
    // this.dh = this.call.getData();

    // console.log('the var', this.name);
  }


  // Still under development
  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      console.log('Query Params:', params); // Debugging statement
      this.inputFieldValue = params['inputField'];
      console.log('Input Field Value:', this.inputFieldValue); // Debugging statement

      // Fetch the student data using the inputFieldValue
      if (this.inputFieldValue) {
        this.call.fetchStudent(this.inputFieldValue);
        this.dh = this.call.getData();
        console.log('Data:', this.dh); // Debugging statement
      }
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  
}
