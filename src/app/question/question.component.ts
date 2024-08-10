import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { ChangeBgDirective } from '../change-bg.directive';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChangeBgDirective],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit {
  public name: string = ' ';

  points: number = 0;
  counter = 60;
  progress: string = '0';

  interval$: any;

  correctAnswer = 0;
  IncorrectAnswer = 0;

  questionList: any[] = [];
  currentQuestion: number = 0;

  isQuizCompleted: boolean = false;

  constructor(private questionServ: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionServ.getQuestionJson().subscribe((res) => {
      console.log('res', res);
      this.questionList = res.questions;
    });
  }

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  userAnswer(userQno: number, userOption: any) {
    if (userQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (userOption.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressValue();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;

        this.resetCounter();
        this.getProgressValue();
      }, 1000);

      this.points -= 10;
      this.IncorrectAnswer++;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    // this.interval$.unsubscibe();
    this.counter = 60;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    console.log('restet');
    this.resetCounter();
    this.getAllQuestions();
    this.currentQuestion = 0;
    this.points = 0;
    this.counter = 60;
    this.progress = '0';
  }

  getProgressValue() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
