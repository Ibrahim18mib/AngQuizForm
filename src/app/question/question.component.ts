import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit {
  public name: string = ' ';

  questionList: any[] = [];
  isQuizCompleted: boolean = false;

  constructor(private questionServ: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions()
  }

  getAllQuestions() {
    this.questionServ.getQuestionJson().subscribe((res) => {
      console.log("res",res);

    });
  }

  previousQuestion() {}

  resetQuiz() {}

  nextQuestion() {}
}
