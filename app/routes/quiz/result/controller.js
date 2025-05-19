import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {quizCorrectAnswers} from "../../../data/quizzes";

export default class QuizResultsController extends Controller {
  @service quizManager;

  get resultData() {
    const quiz = this.model.quiz ?? {};
    const questions = quiz.questions ?? [];
    const quizId = quiz.id;

    return questions.map((q) => {
      const correctAnswer = quizCorrectAnswers[quizId]?.[q.id] ?? [];
      const userAnswers = this.quizManager.answers.get(q.id) ?? new Set();
      const isCorrect = this.quizManager.isCorrectAnswer(quizId, q.id);

      return {
        question: q.text,
        userAnswer: [...userAnswers].join(', '),
        correctAnswer: correctAnswer.join(', '),
        isCorrect,
      };
    });
  }

  get correctCount() {
    return this.resultData.filter(r => r.isCorrect).length;
  }
}
