import { Component, Input } from '@angular/core';
import { Datahelper } from '../humber-cgkr/data-helpers';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent{
  @Input() df: Datahelper
  constructor() { }

}
