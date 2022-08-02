import { Component, OnInit } from '@angular/core';
import { DataStateService } from 'src/app/services/data-state.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.scss']
})
export class WorkoutPlanComponent implements OnInit {

  constructor(private dataStateService: DataStateService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataStateService.selectedStepIndex.next(3);
    })
  }

}
