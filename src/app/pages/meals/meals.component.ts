import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Nutrient } from 'src/app/models/nutrient';
import { DataStateService } from 'src/app/services/data-state.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss', '../../app.component.scss'],
})
export class MealsComponent implements OnInit, OnDestroy {

  private destroySub = new Subject<void>();
  
  showMacros = {
    protein: true,
    carbohydrate: true,
    fat: true,
    fiber: false,
  };
  skip: number = 0;

  nutrientList: Nutrient[] = [];

  showLoadMore: boolean = true;

  nutrientCount!: number;

  nutrientName: string = '';

  favouriteNutrients: any[] = [];

  categoryList: string[] = [];

  selectedCategories: string[] = [];
  constructor(
    private httpService: HttpService,
    private dataStateService: DataStateService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.httpService.getCategories().subscribe(response => {
      if (response.success) {
        this.categoryList = response.categories
      }
    })
    this.userService.currentUser.subscribe((user) => {
      if (user?.user_analytics?.favourite_nutrients) {
        this.favouriteNutrients = user.user_analytics.favourite_nutrients;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
  clearSelect(): void {
    this.selectedCategories = [];
  }
  getMeals(): void {
    if (this.selectedCategories.length < 1) {
      this.selectedCategories = this.categoryList;
    }
    this.dataStateService.loading.next(true);
    this.httpService
      .getMeals(this.showMacros, this.nutrientName, this.selectedCategories, this.skip)
      .subscribe((response) => {
        if (response.success) {
          this.nutrientCount = response.metadata[0]?.total;
          if (response.nutrients.length > 0) {
            if (response.nutrients.length < 12) {
              this.showLoadMore = false;
            }
            if (
              this.nutrientList.length + response.nutrients.length <=
              this.nutrientCount
            ) {
              this.nutrientList = this.nutrientList.concat(response.nutrients);
              if (
                this.nutrientList.length + response.nutrients.length ==
                this.nutrientCount
              ) {
                this.showLoadMore = false;
              }
            } else {
              this.nutrientList = this.nutrientList.concat(
                response.nutrients.slice(
                  0,
                  this.nutrientCount -
                    (this.nutrientList.length + response.nutrients.length)
                )
              );
              this.showLoadMore = false;
            }
            this.dataStateService.openSnackBar(response.message, 'OK');
            this.dataStateService.loading.next(false);
          } else {
            this.showLoadMore = false;
            this.dataStateService.openSnackBar('No matching nutrient!', 'OK');
            this.dataStateService.loading.next(false);
          }
        } else {
          this.dataStateService.loading.next(false);
          this.dataStateService.openSnackBar(response.message, 'OK');
          this.showLoadMore = false;
        }
      });
  }
  startSearch(): void {
    this.showLoadMore = true;
    this.nutrientList = [];
    this.skip = 0;
    this.getMeals();
  }
  loadMore(): void {
    this.skip++;
    this.getMeals();
  }
  addToFavourite(nutrientId: string) {
    if (this.favouriteNutrients.includes(nutrientId)) {
      this.favouriteNutrients = this.favouriteNutrients.filter(item => item != nutrientId)
    } else {
      this.favouriteNutrients.push(nutrientId);
    }
    this.dataStateService.loading.next(true);
    this.httpService.addToFavourite(nutrientId).subscribe((response) => {
      if (response.success) {
        this.dataStateService.openSnackBar(response.message, 'OK');
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
      this.dataStateService.loading.next(false);
    });
  }
  addToDailyCalories(calories: number): void {
    this.dataStateService.loading.next(true);
    this.httpService.addToDailyCaloryIntake(calories).subscribe((response) => {
      if (response.success) {
        this.dataStateService.openSnackBar(response.message, 'OK');
      } else {
        this.dataStateService.openSnackBar(response.message, 'OK');
      }
      this.dataStateService.loading.next(false);
    });
  }
}