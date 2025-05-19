import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { ROUTE_QUIZ } from "../../helpers/routes";

export default class IndexController extends Controller {

  @service router;

  get quizzes() {
    return this.model.quizzes ?? [];
  }

  @action
  openQuiz(id) {
    this.router.transitionTo(ROUTE_QUIZ, id);
  }
}
