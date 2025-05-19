import Route from '@ember/routing/route';
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';


export default class QuizResultRoute extends Route {

  @service
  quizManager;

  async model() {

  }
}
