import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataStateService } from 'src/app/services/data-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();

  disabled: boolean = false;
  idx!: number;
  constructor(private router: Router,
    public dataStateService: DataStateService,
    private userService: UserService
    ) { 
    }

  stepperData: {index: number, title: string, url: string, needAuth: boolean}[] = [];
  ngOnInit(): void {
    this.stepperData  = [
      {
        index: 0,
        title: 'PERSONAL DATA & ANALYTICS',
        url: 'personal-data',
        needAuth: true
      },
      {
        index: 1,
        title: 'EXERCISES',
        url: 'exercises',
        needAuth: false
      },
      {
        index: 2,
        title: 'MEALS',
        url: 'meals',
        needAuth: false
      },
      {
        index: 3,
        title: 'CREATE WORKOUT PLAN',
        url: 'workout-plan',
        needAuth: true
      }
      /*{
        index: 4,
        title: 'ANALYTICS',
        url: 'analytics',
        needAuth: true
      }*/
    ]
    this.userService.currentUser.subscribe(user => {
      if (user !== null) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    })
    this.dataStateService.selectedStepIndex.subscribe(index => {
      this.idx = index;
    })
    
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
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
