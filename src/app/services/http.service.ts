import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { CaloryGainWeight, DailyCaloryModel, UserAnalytics } from '../models/dailyCalory.model';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private userService: UserService) {}
  
  // RAPID API
  calculateBmi(user: User): Observable<any> {
    return this.http.get<any>(
      `https://fitness-calculator.p.rapidapi.com/bmi?age=${user.age}&weight=${user.weight}&height=${user.height}`,
      {
        headers: {
          'X-RapidAPI-Key':
            '6462b9a076mshbe0c99b4945d14fp1c29f6jsncbc80aed24bb',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
        },
      }
    );
  }
  calculateIdealWeight(user: User): Observable<any> {
    return this.http.get<any>(
      `https://fitness-calculator.p.rapidapi.com/idealweight?gender=${user.gender}&height=${user.height}`,
      {
        headers: {
          'X-RapidAPI-Key': '6462b9a076mshbe0c99b4945d14fp1c29f6jsncbc80aed24bb',
		      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        },
      }
    );
  }
  calculateDailyCaloryReq(user: User): Observable<any> {
    return this.http.get<any>(
      `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${user.age}&gender=${user.gender}&height=${user.height}&weight=${user.weight}&activitylevel=${user.activity_level}`,
      {
        headers: {
          'X-RapidAPI-Key': '6462b9a076mshbe0c99b4945d14fp1c29f6jsncbc80aed24bb',
		      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        },
      }
    );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/users/update-user`, user);
  }
  getUserAnalytics(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/get-user-analytics/${this.userService.currentUser.getValue()?._id}`);
  }
  updateUserAnalytics(user_analytics: UserAnalytics): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users/save-user-analytics/${this.userService.currentUser.getValue()?._id}`, user_analytics);
  }
  // GET CATEGORIES
  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/nutritions/categories`);
  }
  //GET MEALS
  getMeals(macros: any, foodName: string, categories: string[], skip: number): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/nutritions/get-nutritions`, {macros, foodName, categories, skip});
  }
  // ADD TO FAVOURITE
  addToFavourite(nutrientId: string): Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/users/${nutrientId}/add-to-favourite/${this.userService.currentUser.getValue()?._id}`, {});
  }
  addToDailyCaloryIntake(calories: number): Observable<any> {
    const todayDate: Date = new Date();
    return this.http.post<any>(`${environment.baseUrl}/users/daily-calory-intake/${this.userService.currentUser.getValue()?._id}`, {calories, todayDate});
  }
  getWorkouts(exerciseName: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/workouts/get-workouts-by-name/${exerciseName}`, { withCredentials: true });
  }
  saveWorkout(workout: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/users/save-workout-plan/${this.userService.currentUser.getValue()?._id}`, {workout});
  }
  deleteWorkout(workoutId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/users/delete-workout-plan/${workoutId}/${this.userService.currentUser.getValue()?._id}`);
  }
}
