import Route from '@ember/routing/route';
import { tracked } from "@glimmer/tracking";


class Model {
  @tracked
  quizzes = [];

  constructor(quizzes) {
    this.quizzes = quizzes;
  }
}


export default class IndexRoute extends Route {
  model() {
    // "получаем" данные
    // не стал подключать сервис для генерации uuid, да, id такого рода неправильны
    const quizzes = [
      { id: 'js', name: 'JavaScript Quiz' },
      { id: 'html', name: 'HTML Basics Quiz' },
    ];

    return new Model(quizzes);
  }
}
