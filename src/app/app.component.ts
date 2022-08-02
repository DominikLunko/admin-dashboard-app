import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataStateService } from './services/data-state.service';
import { ExerciseService } from './services/exercise.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showStepper: boolean = true;

  private destroySub = new Subject<void>();

  constructor(
    private exerciseService: ExerciseService,
    private dataStateService: DataStateService,
    private userService: UserService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.userService.refreshToken().subscribe((response) => {
      if (response.success) {
        this.userService.currentUser.next(response.user);
        this.dataStateService.selectedStepIndex.next(0);
        this.dataStateService.currentUrl.next('personal-data');
        this.router.navigate(['personal-data']);
      } else {
        this.userService.currentUser.next(null);
        this.dataStateService.selectedStepIndex.next(1);
        this.dataStateService.currentUrl.next('exercises');
        this.router.navigate(['exercises']);
      }
    });
    this.dataStateService.currentUrl.subscribe((url) => {
      if (url === 'login' || url === 'register') {
        this.showStepper = false;
      } else {
        this.showStepper = true;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
