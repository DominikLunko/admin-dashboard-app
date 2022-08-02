import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DailyCaloryModel, UserAnalytics } from 'src/app/models/dailyCalory.model';
import { User } from 'src/app/models/user';
import { DataStateService } from 'src/app/services/data-state.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-data-popup',
  templateUrl: './personal-data-popup.component.html',
  styleUrls: ['./personal-data-popup.component.scss']
})
export class PersonalDataPopupComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();

  gender_list: string[] = ['male', 'female'];
  activity_level_list: {key: string, value: string}[] = [
    {key: 'level_1', value: 'LEVEL 1'},
    {key: 'level_2', value: 'LEVEL 2'},
    {key: 'level_3', value: 'LEVEL 3'},
    {key: 'level_4', value: 'LEVEL 4'},
    {key: 'level_5', value: 'LEVEL 5'},
    {key: 'level_6', value: 'LEVEL 6'},
  ]
  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User, title: string},
  public dialogRef: MatDialogRef<PersonalDataPopupComponent>,
  private userService: UserService,
  private httpService: HttpService,
  private dataStateService: DataStateService) { }

  ngOnInit(): void {
  }
  async saveData (): Promise<void> {
    if (this.data.user.age && this.data.user.weight && this.data.user.height && this.data.user.gender && this.data.user.activity_level) {
      this.calculateAllDataFromRapidAPI();
      
    } else {
      this.dataStateService.openSnackBar('Enter all data, so we can calculate some data for you', 'OK');
    }
  }
  
  calculateAllDataFromRapidAPI() {
    let responseData: any = {};
    this.dataStateService.loading.next(true);
    this.httpService.calculateBmi(this.data.user).subscribe(
      (response) => {
          responseData.bmi = response.data.bmi;
          responseData.health = response.data.health;
          responseData.healthy_bmi_range = response.data.healthy_bmi_range;
          this.httpService.calculateIdealWeight(this.data.user).subscribe(
            (response) => {
                let weight_sum: number = 0;
                let keys = Object.keys(response.data);
                keys.forEach(key => {
                  weight_sum = weight_sum + response.data[key];
                })
                responseData.ideal_weight = weight_sum/keys.length;
                this.httpService.calculateDailyCaloryReq(this.data.user).subscribe(
                  (response) => {
                      this.dataStateService.loading.next(false);
                      // let dailyCaloryGoals: DailyCaloryModel = new DailyCaloryModel(response.data);
                      responseData.weight_goals = response.data;
                      responseData.bmr = response.data.BMR;
                      this.data.user.user_analytics = new UserAnalytics(responseData);
                      this.userService.currentUser.next(this.data.user);
                      this.dialogRef.close(true);
                  },
                  (error) => {
                    this.dataStateService.loading.next(false);
                    this.dataStateService.openSnackBar(error.message, 'OK');
                  }
                );
            },
            (error) => {
              this.dataStateService.loading.next(false);
              this.dataStateService.openSnackBar(error.message, 'OK');
            }
          );
      },
      (error) => {
        this.dataStateService.loading.next(false);
        this.dataStateService.openSnackBar(error.message, 'OK');
      }
    );
    
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
