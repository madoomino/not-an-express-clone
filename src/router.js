const setprototypeof = require("setprototypeof");

const proto = (module.exports = function (options) {
  const opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  setprototypeof(router, proto);

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opt.mergeParams;
  router.strict = opts.strict;
  router.stack = [];

  return router;
});

proto.route = function route(path) {
  const route = new Route(path);
  const layer = new Layer(path, {}, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};
