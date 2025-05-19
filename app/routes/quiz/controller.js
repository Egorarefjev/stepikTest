import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QuizController extends Controller {

  @service router;

  get name() {
    return this.model.quiz?.name ?? '';
  }

  get questions() {
    return this.model.quiz?.questions ?? [];
  }

}
