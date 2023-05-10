const methods = require("methods");
const Router = require("./router");
const slice = Array.prototype.slice;
const http = require("http");
const middleware = require("./middleware/init");

const app = (exports = module.exports = {});

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this._router = undefined;
};

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({});
  }
  this._router.use(middleware.init(this));
};

methods.forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter();

    const route = this._router.route(path);

    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

app.listen = function listen() {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

app.handle = function handle(req, res, callback) {
  const router = this._router;

  router.handle(req, res);
};
