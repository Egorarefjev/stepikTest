import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class QuizCardComponent extends Component {

  get name() {
    return this.args.name ?? '';
  }

  get id() {
    return this.args.id ?? '';
  }

  @action
  onOpenQuiz(id) {
    if (typeof this.args.onClickAction === 'function' && id) {
      this.args.onClickAction(id);
    } else {
      console.error('QuizCardComponent have problem whith onClick');
    }
  }
}
