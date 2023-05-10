const express = require("./src/aFramework");
const app = express();

app.get("/", (req, res, next) => {
  console.log("first!");
  next();
});

app.get("/", (req, res, next) => {
  console.log("second!");
  res.writeHead(200);
  res.write("finished");
  res.end();
});

app.listen(3000, () => console.log(`it worked :")`));
