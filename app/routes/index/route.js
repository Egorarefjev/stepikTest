import Route from '@ember/routing/route';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


class Model {
  @tracked
  quizzes = [];

  constructor(quizzes) {
    this.quizzes = quizzes;
  }
}


export default class IndexRoute extends Route {

  @service
  quizManager;

  async model() {
    // await тут не нужен, но при реальных условиях нужен
    const quizzes = await this.quizManager.getQuizzes();

    return new Model(quizzes);
  }
}
