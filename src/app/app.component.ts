import { Component } from '@angular/core';
import { FoodService } from './services/food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mongoDB-app';

  constructor(private foodService: FoodService) {
    
  }
  getTableNames(): void {
    this.foodService.getTableName();
  }
  getSubtableNames(): void {
    this.foodService.getSubtableNames()
  }
}
