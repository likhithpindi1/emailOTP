let express = require("express");
let port = process.env.PORT || 3000;
let app = express();
let route = require("./routers/routers");
app.use(express.json());
app.use("/api/v1", route);
app.get("/", (req, res) => {
  res.send("h1");
  res.end();
});

app.listen(port, () => {
  console.log(port);
});
