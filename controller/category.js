const sequelize = require("sequelize");
const model = require("../models");
const category = model.category;

module.exports = {
  // Create a new category
  async create(req, res) {
    try {
      const { description } = req.body;
      const Category = await category.create({
        description,
      });
      return res.json({ msg: "Category created successfully" });
    } catch (error) {
      return res.json({ msg: `Error while creating category: ${error}` });
    }
  },

  // Update a specific category by id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const Category = await category.update(
        {
          description,
        },
        { where: { id } }
      );
      return res.json({ msg: "Category updated successfully" });
    } catch (error) {
      return res.json({ msg: `Error while updating category: ${error}` });
    }
  },

  // List all categories
  async findAll(req, res) {
    try {
      const { page } = req.params;
      const limit = 5;

      const Category = await category.findAndCountAll({
        order: [["id", "ASC"]],
        limit: limit,
        offset: parseInt(page),
      });
      return res.json({ Category });
    } catch (error) {
      return res.json({ msg: `Error while listing categories: ${error}` });
    }
  },
};
