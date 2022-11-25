const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(8080, function (req, res) {
  console.log("Servidor is running on port 8080");
});
