import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateService } from './services/data-state.service';
import { ExerciseService } from './services/exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-mongoDB-app';
  showStepper: boolean = true;
  constructor(
    private exerciseService: ExerciseService,
    private dataStateService: DataStateService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.dataStateService.currentUrl.subscribe(url => {
      if (url === 'login' || url === 'register') {
        this.showStepper = false;
      } else {
        this.showStepper = true;
      }
    });
  }
}
