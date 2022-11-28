const express = require("express");
const app = express();
const router = require("./router/router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(8080, function (req, res) {
  console.log("Servidor is running on port 8080");
});
