import Route from '@ember/routing/route';
import { ROUTE_QUIZ } from "../../../helpers/routes";

export default class QuizResultRoute extends Route {

  model() {
    return this.modelFor(ROUTE_QUIZ);
  }
}
