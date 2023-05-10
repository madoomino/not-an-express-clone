const proto = require("./app");
const mixin = require("merge-descriptors");
const http = require("http");

exports = module.exports = createApplication;

function createApplication() {
  const app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  const req = Object.create(http.IncomingMessage.prototype);
  const res = Object.create(http.ServerResponse.prototype);

  res.send = function (body) {
    console.log("ok", body);
  };

  app.response = Object.create(res, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: app,
    },
  });

  app.init();
  return app;
}
