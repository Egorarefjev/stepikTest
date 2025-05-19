import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { quizzesFromServer } from "../data/quizzes";

export default class QuizManagerService extends Service {

  @tracked quizzes;
  @tracked answers = new Map();

  /**
   * Возвращает подробный квиз с вопросами и вариантами
   * @returns {array<object>}
   */
  @action
  getQuizzes() {
    //тут должен быть метод получения списка квизов и присваивания результата в this.quizzes
    //так же при сложных трансформациях лучше сделать отдельный класс (доменную модель)
    // и map'ом создавать новые экземпляры
    this.quizzes = quizzesFromServer?.map(({ id, name, description }) => ({
      id,
      name,
      description
    }));

    return this.quizzes;
  }

  /**
   * Возвращает подробный квиз с вопросами и вариантами
   * @param {string} id
   * @returns {Object|null}
   */
  @action
  getQuizById(id) {
    //тут должен быть метод получения подробной информации о квизе по его id, в том числе список вопросов
    return quizzesFromServer?.find((quiz) => quiz.id === id) ?? null;
  }


  /**
   * Переключает выбор для конкретного вопроса и варианта.
   * @param {string|number} questionId
   * @param {string|number} choiceId
   */
  @action
  choiceAnswer(questionId, choice) {
    const current = this.answers.get(questionId) || new Set();

    if (current.has(choice)) {
      current.delete(choice);
    } else {
      current.add(choice);
    }

    // триггерим tracked реактивность
    this.answers = new Map(this.answers.set(questionId, current));
  }

  /**
   * Проверка, выбран ли конкретный вариант.
   */
  @action
  isSelected(questionId, choice) {
    return this.answers.get(questionId)?.has(choice) ?? false;
  }

  /**
   * Очистка всех ответов (например, при отправке или выходе).
   */
  @action
  clear() {
    this.answers = new Map();
  }
}

