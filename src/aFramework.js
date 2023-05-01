const proto = require("./app");
const mixin = require("merge-descriptors");

exports = module.exports = createApplication;

function createApplication() {
  let app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  app.init();
  return app;
}
