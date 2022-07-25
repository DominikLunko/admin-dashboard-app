import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { LoginComponent } from './pages/login/login.component';
import { MealsComponent } from './pages/meals/meals.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { RegisterComponent } from './pages/register/register.component';
import { WorkoutPlanComponent } from './pages/workout-plan/workout-plan.component';

const routes: Routes = [
  {path : 'personal-data', component : PersonalDataComponent},
  {path : 'exercises', component : ExercisesComponent},
  {path : 'meals', component : MealsComponent},
  {path : 'workout-plan', component : WorkoutPlanComponent},
  {path : 'analytics', component : AnalyticsComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
