import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { ROUTE_INDEX, ROUTE_QUIZ_INDEX } from "../../../helpers/routes";

export default class QuizResultsController extends Controller {
  @service quizManager;
  @service router;

  get quizId() {
    return this.model?.quiz?.id;
  }

  get result() {
    return this.quizManager.getQuizResult(this.model?.quiz);
  }

  get correctCount() {
    return this.result.filter(item => item.isCorrect).length;
  }

  @action
  onClickRestartTest() {
    this.router.transitionTo(ROUTE_QUIZ_INDEX, this.quizId);
  }

  @action
  onClickGoToListQuizzes() {
    this.router.transitionTo(ROUTE_INDEX);
  }
}
