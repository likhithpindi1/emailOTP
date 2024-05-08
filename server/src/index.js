let express = require("express");
let app = express();
let route = require("./routers/routers");
app.use(express.json());
app.use("/api", route);
app.get("/", (req, res) => {
  res.send("h1");
  res.end();
});

app.listen(3000);
