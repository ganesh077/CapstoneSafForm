import { Component, Input } from '@angular/core';
import { Apihelpers } from './components/humber-cgkr/api-helpers';
import { HttpClient } from '@angular/common/http';
import { Datahelper } from './components/humber-cgkr/data-helpers';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() name: string;
  value: string;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  call: Apihelpers;
  dh: Datahelper;
  private _arr: String[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.call = new Apihelpers(http);
    this.call.fetchStudent('N01498359');
    this.dh = this.call.getData();

    console.log('the var', this.name);
  }

  // Still under development
  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.value = params.get('value');
      console.log('Value:', this.value);
    });
  }
}
