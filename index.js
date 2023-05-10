const express = require("./src/aFramework");
const app = express();

app.get("/", (req, res) => {
  res.writeHead(200);
  res.write("Hello world!");
  res.end();
});

app.get("/2", (req, res) => {
  res.writeHead(200);
  res.write("Hello world! 2");
  res.end();
});

app.get("/3", (req, res) => {
  res.writeHead(200);
  res.write("Hello world! 3");
  res.end();
});

app.listen(3000, () => console.log(`it worked :")`));
