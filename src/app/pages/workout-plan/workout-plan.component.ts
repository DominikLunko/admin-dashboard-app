import { Component, OnInit } from '@angular/core';
import { DataStateService } from 'src/app/services/data-state.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { WorkoutPlan } from 'src/app/models/workout_plan';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.scss']
})
export class WorkoutPlanComponent implements OnInit {

  workoutPlanModel!: WorkoutPlan;
  
  createNewPlan: boolean = false;

  exerciseName: string = '';

  
  constructor(private dataStateService: DataStateService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.dataStateService.currentWorkoutPlan.subscribe(workoutPlan => {
      if (workoutPlan !== null) {
        this.workoutPlanModel = workoutPlan;
      } else {
        this.createNewWorkout();
      }
    })
    if (this.workoutPlanModel.workoutDays.find(item => item.title != 'Results')) {
      this.workoutPlanModel.workoutDays.push({title: 'Results', rows: []})
    }
    setTimeout(() => {
      this.dataStateService.selectedStepIndex.next(3);
    })
    console.log(this.workoutPlanModel);
  }

  callFetchExercises(): void {
      this.fetchWorkouts();
  }
  createNewWorkout(): void {
    this.workoutPlanModel = new WorkoutPlan({workoutDays: [
      {title: 'Monday', rows: []},
      {title: 'Tuesday', rows: []},
      {title: 'Wednesday', rows: []},
      {title: 'Thursday', rows: []},
      {title: 'Friday', rows: []},
      {title: 'Saturday', rows: []},
      {title: 'Sunday', rows: []},
      {title: 'Results', rows: []},
    ], title: 'New workout', _id: 'id' + Math.random().toString(16).slice(2)});
  }
  fetchWorkouts(): void {
    this.dataStateService.loading.next(true);
    this.httpService.getWorkouts(this.exerciseName).subscribe((response) => {
      if (response.success) {
        this.workoutPlanModel.workoutDays[this.workoutPlanModel.workoutDays.length - 1].rows = response.exercises;
        this.dataStateService.openSnackBar(response.message, 'OK');
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
      this.dataStateService.loading.next(false);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  saveWorkout() {
    let workoutDto = JSON.parse(JSON.stringify(this.workoutPlanModel));
    workoutDto.workoutDays = workoutDto.workoutDays
    .filter((item: any) => item.title != 'Results')
    console.log(workoutDto)
    this.dataStateService.loading.next(true);
    this.httpService.saveWorkout(workoutDto).subscribe((response) => {
      if (response.success) {
        this.dataStateService.openSnackBar(response.message, 'OK');
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
      this.dataStateService.loading.next(false);
    });
  }
}
