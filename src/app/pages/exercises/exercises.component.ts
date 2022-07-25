import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { DataStateService } from 'src/app/services/data-state.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss', '../../app.component.scss']
})
export class ExercisesComponent implements OnInit {

  skip: number = 0;
  bodyParts: string[] = [];
  currentBodyPart!: string;
  exercises: Exercise[] = [];
  showLoadMore: boolean = true;
  constructor(
    private exerciseService: ExerciseService,
    private dataStateService: DataStateService
  ) { }

  ngOnInit(): void {
    this.getBodyParts();
  }
  getBodyParts(): void {
    this.dataStateService.loading.next(true);
    this.exerciseService.getAllBodyParts().subscribe(response => {
      if (response.success) {
        this.bodyParts = response.bodyParts[0].items;
        this.dataStateService.loading.next(false);
        if (this.bodyParts) {
          this.currentBodyPart = this.bodyParts[0];
          this.getExerciseGroup();
        }
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK')
        this.dataStateService.loading.next(false);
      }
    },
    (error) => {
      this.dataStateService.openSnackBar(error.message, 'OK');
      this.dataStateService.loading.next(false);
    })
  }
  setCurrentBodyPart(bodyPart: string): void {
    this.currentBodyPart = bodyPart;
    this.skip = 0;
    this.exercises = [];
    this.getExerciseGroup();
  }
  getExerciseGroup(): void {
    this.dataStateService.loading.next(true);
    this.exerciseService.getExercisesByBodyPart(this.currentBodyPart, this.skip).subscribe(response => {
      if (response.success) {
        this.dataStateService.loading.next(false);
        if (response.exercises.length > 0) {
          this.exercises = this.exercises.concat(response.exercises);
        }
        if (this.exercises.length < 8) {
          this.showLoadMore = false;
        } else {
          this.showLoadMore = true;
        }
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK')
        this.dataStateService.loading.next(false);
      }
    },
    (error) => {
      this.dataStateService.openSnackBar(error.message, 'OK');
      this.dataStateService.loading.next(false);
    })
  }
  loadMore(): void {
    this.skip ++;
    this.getExerciseGroup();
  }
}
