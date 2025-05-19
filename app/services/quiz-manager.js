import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { quizzesFromServer } from "../data/quizzes";

export default class QuizManagerService extends Service {
  @tracked quizzes;

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
  getQuizById(id) {
    //тут должен быть метод получения подробной информации о квизе по его id, в том числе список вопросов
    return quizzesFromServer?.find((quiz) => quiz.id === id) ?? null;
  }


}

