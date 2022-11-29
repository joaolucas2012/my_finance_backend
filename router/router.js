const express = require("express");
const router = express.Router();
const category = require("../controller/category");
const finance = require("../controller/finance");

/* Category routes */
router.post("/create/category", category.create); // Route to create a new category
router.get("/list/category/:page", category.findAll); // Route to list all categories
router.put("/update/category/:id", category.update); // Route to update all categories
router.delete("/delete/category/:id", category.delete); // Route to delete a category by id

/* Finances routes */
router.post("/create/finance", finance.create); // Route to create a new finance
router.get("/list/finance/:page", finance.findAll); // Route to list all finances
router.get("/list/finance/:categoryId", finance.findByCategoryId); // Route to list finances filtered by category
router.get("/list/finance/:initialDate/:finalDate/:page", finance.filterByDate); // Route to list finances filtered by date
router.put("/update/finance/:id", finance.update); // Route to update all finances
router.delete("/delete/finance/:id", finance.delete); // Route to delete finance by id

module.exports = router;
