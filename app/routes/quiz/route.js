import Route from '@ember/routing/route';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


class Model {
  @tracked quiz;

  constructor(quiz) {
    this.quiz = quiz;
  }
}


export default class QuizRoute extends Route {

  @service quizManager;


  async model(params) {
    const id = params?.id;
    const quiz = await this.quizManager.getQuizById(id);

    return new Model(quiz);
  }

}
