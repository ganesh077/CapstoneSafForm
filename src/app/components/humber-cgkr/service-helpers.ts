/**

    Injectable service to share data between components
    */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private actionsTakenSource = new BehaviorSubject<any[]>([]);
  actionsTaken$ = this.actionsTakenSource.asObservable();


  updateActionsTaken(actions: any[]) {
    this.actionsTakenSource.next(actions);
  }
}
