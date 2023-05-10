const express = require("./src/aFramework");
const app = express();

app.get("/", (req, res) => {
  res.json({ mado: "mino" });
});

app.post("/post", (req, res) => {
  res.writeHead(200);
  res.write("Data from post :)");
  res.end();
});

app.listen(3000, () => console.log(`it worked :")`));
