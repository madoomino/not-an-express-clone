const methods = require("methods");
const app = (exports = module.exports = {});
const slice = Array.prototype.slice;

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  // application router
  this._router = undefined;
};

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this.router = new Router({});
  }
};

methods.forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter();
    const route = this._router.route(path);

    route[method].apply(route, slice.call(arguments, 1));

    return this;
  };
});
