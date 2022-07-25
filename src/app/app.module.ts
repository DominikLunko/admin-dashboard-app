import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


// IMPORT ANULAR MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// IMPORT COMPONENTS AND PAGES
import { NavbarComponent } from './components/navbar/navbar.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { MealsComponent } from './pages/meals/meals.component';
import { WorkoutPlanComponent } from './pages/workout-plan/workout-plan.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StepperComponent,
    PersonalDataComponent,
    ExercisesComponent,
    MealsComponent,
    WorkoutPlanComponent,
    AnalyticsComponent,
    LoginComponent,
    RegisterComponent,
    CustomSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    // Angular material import
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
