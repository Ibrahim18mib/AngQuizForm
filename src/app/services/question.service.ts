import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

//   getQuestionJson() {
//     return this.http.get<any>('assets/questions.json');
//   }

getQuestionJson() {
    return this.http.get<any>('assets/questions.json').pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(() => new Error('Error fetching questions'));
      })
    );
  }
}
