import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { ROUTE_INDEX, ROUTE_QUIZ_INDEX } from "../../../helpers/routes";
import {tracked} from "@glimmer/tracking";

export default class QuizResultsController extends Controller {
  @service quizManager;
  @service router;

  @tracked result;

  get quizId() {
    return this.model?.quiz?.id;
  }


  //так было до worker'a
  // get result() {
  //   return this.quizManager.getQuizResult(this.model?.quiz);
  // }

  get correctCount() {
    return this.result.filter(item => item.isCorrect).length;
  }

  @action
  async loadResult() {
    const quiz = this.model.quiz;
    this.result = await this.quizManager.getQuizResultAsync(quiz);
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
