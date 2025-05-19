import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import {quizCorrectAnswers} from "../../../data/quizzes";

export default class QuizResultsController extends Controller {
  @service quizManager;

  get result() {
    const quiz = this.model.quiz ?? {};
    const questions = quiz.questions ?? [];
    const quizId = quiz.id;

    return questions.map((question) => {
      const correctAnswer = quizCorrectAnswers[quizId]?.[question.id] ?? [];
      const userAnswers = this.quizManager.answers.get(question.id) ?? new Set();
      const isCorrect = this.quizManager.isCorrectAnswer(quizId, question.id);

      return {
        question: question.text,
        userAnswer: [...userAnswers].join(', '),
        correctAnswer: correctAnswer.join(', '),
        isCorrect,
      };
    });
  }

  get correctCount() {
    return this.result.filter(r => r.isCorrect).length;
  }
}
