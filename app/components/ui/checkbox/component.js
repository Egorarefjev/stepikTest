import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UiCheckboxComponent extends Component {
  @action
  handleChange(event) {
    if (typeof this.args.onChange === 'function') {
      this.args.onChange(event.target.checked);
    } else {
      console.error('problem with UiCheckboxComponent');
    }
  }
}
