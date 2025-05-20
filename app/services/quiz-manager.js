import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { quizzesFromServer, quizCorrectAnswers } from '../data/quizzes';

const ROUTE_QUIZ_WORKER = '/workers/quiz-checker.js';

export default class QuizManagerService extends Service {
  @tracked quizzes;
  @tracked answers = new Map();

  /**
   * Возвращает список всех квизов (без вопросов).
   * @returns {Array<{id: string, name: string, description: string}>}
   */
  @action
  getQuizzes() {
    this.quizzes = quizzesFromServer?.map(({ id, name, description }) => ({
      id,
      name,
      description,
    }));
    return this.quizzes;
  }

  /**
   * Возвращает подробный квиз с вопросами и вариантами.
   * @param {string} id
   * @returns {Object|null}
   */
  @action
  getQuizById(id) {
    return quizzesFromServer?.find((quiz) => quiz.id === id) ?? null;
  }

  /**
   * Переключает выбор ответа пользователя для вопроса.
   * @param {string|number} questionId
   * @param {string|number} choice
   */
  @action
  choiceAnswer(questionId, choice) {
    const current = this.answers.get(questionId) || new Set();

    current.has(choice) ? current.delete(choice) : current.add(choice);

    // триггерим tracked
    this.answers = new Map(this.answers.set(questionId, current));
  }

  /**
   * Проверяет, выбран ли пользователем конкретный вариант ответа.
   * @param {string|number} questionId
   * @param {string|number} choice
   * @returns {boolean}
   */
  @action
  isSelected(questionId, choice) {
    return this.answers.get(questionId)?.has(choice) ?? false;
  }

  /**
   * Очищает все выбранные ответы (например, при перезапуске квиза).
   */
  @action
  clear() {
    this.answers = new Map();
  }

  /**
   * Проверяет, верно ли пользователь ответил на конкретный вопрос.
   * @param {string} quizId
   * @param {string} questionId
   * @returns {boolean}
   */
  @action
  isCorrectAnswer(quizId, questionId) {
    const userAnswer = this.answers.get(questionId) ?? new Set();
    const correctAnswer = quizCorrectAnswers[quizId]?.[questionId] ?? [];

    return this.#isAnswerCorrect(userAnswer, correctAnswer);
  }

  /**
   * Возвращает массив результатов пользователя по всем вопросам квиза.
   * @param {object} quiz
   * @returns {Array<{question: string, userAnswer: string, isCorrect: boolean}>}
   */
  @action
  getQuizResult(quiz) {
    const { quizId, questions } = this.#extractQuizData(quiz);

    return questions.map((q) => {
      const userAnswers = this.answers.get(q.id) ?? new Set();
      const correctAnswers = quizCorrectAnswers[quizId]?.[q.id] ?? [];

      return {
        question: q.text,
        userAnswer: [...userAnswers].join(', '),
        isCorrect: this.#isAnswerCorrect(userAnswers, correctAnswers),
      };
    });
  }

  /**
   * Возвращает результат квиза через Web Worker (асинхронно).
   * @param {object} quiz
   * @returns {Promise<Array<{question: string, userAnswer: string, isCorrect: boolean}>>}
   */
  @action
  async getQuizResultAsync(quiz) {
    const { quizId, questions } = this.#extractQuizData(quiz);
    const answersObj = this.#normalizeAnswerMap();
    const correctAnswers = quizCorrectAnswers[quizId] ?? {};

    return new Promise((resolve, reject) => {
      const worker = new Worker(ROUTE_QUIZ_WORKER);

      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };

      worker.onerror = ({ message }) => {
        reject(message);
        worker.terminate();
      };

      worker.postMessage({
        questions,
        answers: answersObj,
        correctAnswers,
      });
    });
  }

  // ================================
  // Private methods
  // ================================

  /**
   * Вспомогательный метод: извлекает quizId и список вопросов из объекта квиза.
   * @param {object} quiz
   * @returns {{quizId: string, questions: Array}}
   */
  #extractQuizData(quiz) {
    return {
      quizId: quiz?.id,
      questions: quiz?.questions ?? [],
    };
  }

  /**
   * Преобразует ответы из Map<string, Set> в обычный объект: { questionId: string[] }.
   * @returns {Object<string, string[]>}
   */
  #normalizeAnswerMap() {
    const result = {};
    this.answers.forEach((value, key) => {
      result[key] = [...value];
    });
    return result;
  }

  /**
   * Проверяет, совпадает ли пользовательский ответ с правильным.
   * @param {Set<string|number>} userAnswerSet
   * @param {Array<string|number>} correctAnswerArray
   * @returns {boolean}
   */
  #isAnswerCorrect(userAnswerSet, correctAnswerArray) {
    return (
      correctAnswerArray.length === userAnswerSet.size &&
      correctAnswerArray.every((a) => userAnswerSet.has(a))
    );
  }
}
