const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "Arsh", lastname: "Gogia" });
});

app.get("/ab*cd", (req, res) => {
  res.send({ firstname: "Arsh", lastname: "Gogia" });
});

app.get(/a/, (req, res) => {
  res.send({ firstname: "Arsh", lastname: "Gogia" });
});

app.get(/.*fly$/, (req, res) => {
  res.send({ firstname: "Arsh", lastname: "Gogia" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
