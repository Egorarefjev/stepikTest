import Route from '@ember/routing/route';
import { ROUTE_QUIZ } from "../../../helpers/routes";
import { inject as service } from '@ember/service';

const DEFAULT_DELAY = 1500;

export default class QuizResultRoute extends Route {

  @service quizManager;

  model() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.modelFor(ROUTE_QUIZ);
        resolve(data);
      }, DEFAULT_DELAY);
    });
  }

  resetController() {
    this.quizManager.clear();
  }
}
