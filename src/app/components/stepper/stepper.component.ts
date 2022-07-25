import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStateService } from 'src/app/services/data-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  disabled: boolean = false;
  constructor(private router: Router,
    public dataStateService: DataStateService,
    private userService: UserService
    ) { }

  stepperData: {index: number, title: string, url: string, disabled: boolean}[] = [];
  ngOnInit(): void {
    this.stepperData  = [
      {
        index: 0,
        title: 'PERSONAL DATA',
        url: 'personal-data',
        disabled: this.userService.currentUser.getValue() !== null ? false : true 
      },
      {
        index: 1,
        title: 'EXERCISES',
        url: 'exercises',
        disabled: false
      },
      {
        index: 2,
        title: 'MEALS',
        url: 'meals',
        disabled: false
      },
      {
        index: 3,
        title: 'WORKOUT_PLAN',
        url: 'workout-plan',
        disabled: this.userService.currentUser.getValue() !== null ? false : true 
      },
      {
        index: 4,
        title: 'ANALYTICS',
        url: 'analytics',
        disabled: this.userService.currentUser.getValue() !== null ? false : true 
      },
    ]
    this.router.navigate(['exercises']);
    this.dataStateService.selectedStepIndex.next(1);
  }
  
  onTabChange(event: any): void {
    let route: string = this.stepperData[event.index].url;
    this.dataStateService.currentUrl.next(route);
    this.router.navigate([route]);
  }
  showSnackBar(): void {
    if (this.userService.currentUser.getValue() == null) {
      
    }
  }
}
