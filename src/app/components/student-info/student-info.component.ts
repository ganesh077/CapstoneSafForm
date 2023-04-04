import { Component, Input } from '@angular/core';
import { Datahelper } from '../humber-cgkr/data-helpers';
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent{
  @Input() df: Datahelper
  
  constructor() { 
  }

}
