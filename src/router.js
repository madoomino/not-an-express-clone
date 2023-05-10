const setPrototypeOf = require("setprototypeof");
const Route = require("./route");
const Layer = require("./Layer");
const parseurl = require("parseurl");

const proto = (module.exports = function (options) {
  const opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  setPrototypeOf(router, proto);

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opts.mergeParams;
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

proto.handle = function handle(req, res, next) {
  const self = this;
  const stack = self.stack;
  let idx = 0;

  next();

  function next() {
    const path = getPathname(req);

    let layer;
    let match;
    let route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (match !== true) {
        continue;
      }

      if (!route) {
        continue;
      }

      route.stack[0].handle_request(req, res, next);
    }
    if (match) {
      layer.handle_request(req, res, next);
    }
  }
};

function matchLayer(layer, path) {
  try {
    return layer.match(path);
  } catch (error) {
    return error;
  }
}

proto.use = function use(fn) {
  const layer = new Layer("/", {}, fn);

  layer.route = undefined;
  this.stack.push(layer);

  return this;
};

function getPathname(req) {
  try {
    return parseurl(req).pathname;
  } catch (error) {
    return undefined;
  }
}
