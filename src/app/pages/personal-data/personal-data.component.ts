import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Nutrient } from 'src/app/models/nutrient';
import { User } from 'src/app/models/user';
import { WorkoutPlan } from 'src/app/models/workout_plan';
import { DataStateService } from 'src/app/services/data-state.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { PersonalDataPopupComponent } from './personal-data-popup/personal-data-popup.component';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss', '../../app.component.scss'],
})
export class PersonalDataComponent implements OnInit, OnDestroy {
  private destroySub = new Subject<void>();

  editMode: boolean = false;
  user!: User;
  favouriteNutrientsArray: Nutrient[] = [];
  workoutPlans: any[] = [];
  todayDailyCaloriesIntake!: {date: string, calories: number};
  recentCaloriesIntake: {date: string, calories: number}[] = [];

  today: string = new Date().toISOString().split('T')[0];
  constructor(
    public userService: UserService,
    private popup: MatDialog,
    private dataStateService: DataStateService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserAnalytics();
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    if (
      !this.user.age ||
      !this.user.weight ||
      !this.user.height ||
      !this.user.activity_level ||
      !this.user.gender
    ) {
      this.popup
        .open(PersonalDataPopupComponent, {
          data: {
            user: this.user,
            title: 'Enter all data, so we can calculate some data for you',
          },
        })
        .afterClosed()
        .subscribe((success) => {
          if (success) {
            this.sendDataToAPI();
          } else {
            this.dataStateService.openSnackBar('Saving canceled', 'OK!');
          }
        });
    }
  }
  setCurrentWorkoutPlan(workoutPlan: WorkoutPlan): void {
    this.dataStateService.currentWorkoutPlan.next(workoutPlan);
    this.router.navigate(['workout-plan']);
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
  selectCalorieProgram(calorie: number) {

  }
  getUserAnalytics(): void {
    this.dataStateService.loading.next(true);
    this.httpService.getUserAnalytics().subscribe((response) => {
      if (response.success) {
        this.user.user_analytics = response.analytics[0];
        this.workoutPlans = response.analytics[0].workout_plans;
        this.favouriteNutrientsArray = response.analytics[0].joined_favourite_nutrients;
        this.user.user_analytics.favourite_nutrients = response.analytics[0].joined_favourite_nutrients.map((item: any) => item._id)
        let dailyCaloryIntake = response.analytics[0]?.daily_calory_intake.map((item: any) => {
          return {date: item.date.split('T')[0], calories: item.calories}
        });
        
        this.todayDailyCaloriesIntake  = dailyCaloryIntake.find((item: any) => item.date == this.today);
        this.recentCaloriesIntake = dailyCaloryIntake.filter((item: any) => item.date !== this.today);
        if (this.router.url.includes('personal-data')) {
          this.dataStateService.openSnackBar(response.message, 'OK');
        }
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
      this.dataStateService.loading.next(false);
    });
  }
  sendDataToAPI(): void {
    this.dataStateService.loading.next(true);
    this.httpService.updateUser(this.user).subscribe((response) => {
      if (response.success) {
        this.dataStateService.openSnackBar(response.message, 'OK');
        this.httpService
          .updateUserAnalytics(this.user.user_analytics)
          .subscribe((response) => {
            if (response.success) {
              console.log(response);
              this.dataStateService.loading.next(false);
            } else {
              this.dataStateService.loading.next(false);
            }
          });
      } else {
        this.dataStateService.loading.next(false);
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
    });
  }

  editData(): void {
    this.popup
      .open(PersonalDataPopupComponent, {
        disableClose: true,
        data: {
          user: this.user,
          title: 'Enter your personal data',
        },
      })
      .afterClosed()
      .subscribe((success) => {
        if (success) {
          this.sendDataToAPI();
        } else {
          this.dataStateService.openSnackBar('Saving canceled', 'OK!');
        }
      });
  }
  deleteWorkoutPlan(workoutId: string): void {
    this.dataStateService.loading.next(true);
    this.httpService.deleteWorkout(workoutId).subscribe((response) => {
      if (response.success) {
        this.workoutPlans = this.workoutPlans.filter(workoutPlan => workoutPlan.uniqueId != workoutId)
        this.dataStateService.openSnackBar(response.message, 'OK');
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
      this.dataStateService.loading.next(false);
    });
  }
}
