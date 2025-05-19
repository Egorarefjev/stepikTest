import Component from '@glimmer/component';
import { action } from '@ember/object';

const DEFAULT_TYPE = 'primary'

export default class UiButtonComponent extends Component {

  get type() {
    return this.args.type ?? DEFAULT_TYPE;
  }

  get isDisabled() {
    return this.args.disabled ?? false;
  }

  @action
  handleClick(event) {
    if (!this.isDisabled && typeof this.args.onClick === 'function') {
      this.args.onClick(event);
    } else {
      console.error('problem with UiButtonComponent')
    }
  }
}
