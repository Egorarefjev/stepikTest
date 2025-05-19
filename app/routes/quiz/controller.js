import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { ROUTE_QUIZ_RESULT } from "../../helpers/routes";

export default class QuizController extends Controller {

  @service
  router;

  @service
  quizManager;

  get selectedAnswers() {
    return this.quizManager.answers;
  }

  get name() {
    return this.model.quiz?.name ?? '';
  }

  get questions() {
    return this.model.quiz?.questions ?? [];
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
