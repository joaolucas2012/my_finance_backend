const express = require("express");
const app = express();
const router = require("./router/router");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8080, () => console.log("Server is running on port 8080"));
