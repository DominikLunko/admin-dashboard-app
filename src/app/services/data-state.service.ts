import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataStateService {

  currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('exercises');
  selectedStepIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private _snackBar: MatSnackBar
  ) { }
  openSnackBar(message: string, action: string):void {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
