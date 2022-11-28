const express = require("express");
const router = express.Router();
const category = require("../controller/category");

// Route to create a new category
router.post("/create/category", category.create);

// Route to list all categories
router.get("/list/category/:page", category.findAll);

// Route to update all categories
router.put("/update/category/:id", category.update);

module.exports = router;
