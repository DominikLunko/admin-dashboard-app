import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { DataStateService } from 'src/app/services/data-state.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss', '../../app.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();

  skip: number = 0;
  bodyParts: string[] = [];
  currentBodyPart!: string;
  exercises: Exercise[] = [];
  exerciseCount!: number;
  showLoadMore: boolean = true;
  constructor(
    private exerciseService: ExerciseService,
    private dataStateService: DataStateService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataStateService.selectedStepIndex.next(1);
    })
    this.getBodyParts();
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
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
    this.showLoadMore = true;
    this.getExerciseGroup();
  }
  getExerciseGroup(): void {
    this.dataStateService.loading.next(true);
          this.exerciseService.getExercisesByBodyPart(this.currentBodyPart, this.skip).subscribe(response => {
            if (response.success) {
              console.log(response)
              this.exerciseCount = response.metadata[0].total;
              if (response.exercisesList.length > 0) {
                if (response.exercisesList.length < 8) {
                  this.showLoadMore = false;
                }
                let overallLength = this.exercises.length + response.exercisesList.length;
                if (overallLength <= this.exerciseCount) {
                  this.exercises = this.exercises.concat(response.exercisesList);
                } else {
                  this.exercises = this.exercises
                  .concat(response.exercisesList
                    .slice(0, this.exerciseCount - (overallLength)))
                  this.showLoadMore = false;
                }
              } else {
                this.showLoadMore = false;
              }
              this.dataStateService.loading.next(false);
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
