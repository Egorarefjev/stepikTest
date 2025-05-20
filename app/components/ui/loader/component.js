import Component from '@glimmer/component';

const DEFAULT_SIZE = '44px'

export default class UiLoaderComponent extends Component {

  get size() {
    return this.args.size ?? DEFAULT_SIZE;
  }

}
