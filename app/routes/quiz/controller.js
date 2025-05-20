import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { ROUTE_QUIZ_INDEX, ROUTE_QUIZ_RESULT } from "../../helpers/routes";

export default class QuizController extends Controller {

  @service router;
  @service quizManager;

  get name() {
    return this.model.quiz?.name ?? '';
  }

  get questions() {
    return this.model.quiz?.questions ?? [];
  }

  get isQuizPage() {
    return this.router.currentRouteName === ROUTE_QUIZ_INDEX;
  }

  @action
  onToggleAnswer(questionId, choice) {
    this.quizManager.choiceAnswer(questionId, choice);
  }

  @action
  submitAnswer() {
    this.router.transitionTo(ROUTE_QUIZ_RESULT);
  }
}
