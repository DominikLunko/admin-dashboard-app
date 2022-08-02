import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}


  getAllBodyParts(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/exercise-group/allBodyParts`, { withCredentials: true });
  }

  // getCountOfExercisesByBodyPart(bodyPart: string): Observable<any> {
  //   return this.http.post<any>(`${environment.baseUrl}/exercise-group/count-exercise`, {bodyPart})
  // }

  getExercisesByBodyPart(bodyPart: string, skip: number): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/exercise-group/exercise-list`, {bodyPart, skip});
  }
}
