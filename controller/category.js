const sequelize = require("sequelize");
const model = require("../models");
const category = model.Category;

module.exports = {
  // Create a new category
  async create(req, res) {
    try {
      const { description } = req.body;
      await category.create({
        description,
      });
      return res.json({ msg: "Category created successfully!" });
    } catch (error) {
      return res.json({ msg: `Error while creating category: ${error}` });
    }
  },

  // Update a specific category by id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      await category.update(
        {
          description,
        },
        { where: { id } }
      );
      return res.json({ msg: "Category updated successfully!" });
    } catch (error) {
      return res.json({ msg: `Error while updating category: ${error}` });
    }
  },

  // List all categories
  async findAll(req, res) {
    try {
      const Category = await category.findAndCountAll({
        order: [["id", "ASC"]],
      });
      return res.json({ Category });
    } catch (error) {
      return res.json({ msg: `Error while listing categories: ${error}` });
    }
  },

  // Delete a category by id
  async delete(req, res) {
    try {
      const { id } = req.params;
      await category.destroy({
        where: {
          id: id,
        },
      });
      return res.json({ msg: `Category deleted successfully!` });
    } catch (error) {
      return res.json({ msg: `Error while deleting category: ${error}` });
    }
  },
};
