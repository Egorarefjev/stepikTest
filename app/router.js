import EmberRouter from '@ember/routing/router';
import config from 'stepik-test/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('routes.index', { path: '/' });
  this.route('routes.quiz', { path: '/:id' }, function () {
    this.route('routes.quiz.results')
  });
  this.route('routes.results', { path: '/:id' });

});
