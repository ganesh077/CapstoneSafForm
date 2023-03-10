import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saf-selection',
  templateUrl: './saf-selection.component.html',
  styleUrls: ['./saf-selection.component.css'],
})
export class SafSelectionComponent implements OnInit {
  @ViewChild('commentsInput') commentsInput!: ElementRef;
  constructor(private router: Router) {}
  formData = {
    comments: '',
  };
  onSubmit() {
    const comments = this.commentsInput.nativeElement.value;
    console.log('in here', comments);
    const formData = { comments };
    //Will call post request here, use api helper and wrap
    // this.router.navigate(['/create-ticket'], { state: { formData } });
  }
  ngOnInit(): void {}
}
