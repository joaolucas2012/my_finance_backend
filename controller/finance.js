const sequelize = require("sequelize");
const Op = sequelize.Op;
const model = require("../models");
const finance = model.Finance;
const Category = model.Category;

module.exports = {
  // Create a new finance
  async create(req, res) {
    try {
      const { date, categoryId, title, value } = req.body;
      await finance.create({
        date,
        categoryId,
        title,
        value,
      });
      return res.json({ msg: "Finance created successfully!" });
    } catch (error) {
      return res.json({ msg: `Error while creating finance: ${error}` });
    }
  },

  // Update a specific finance by id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { date, categoryId, title, value } = req.body;
      await finance.update(
        {
          date,
          categoryId,
          title,
          value,
        },
        { where: { id } }
      );
      return res.json({ msg: "Finance updated successfully!" });
    } catch (error) {
      return res.json({ msg: `Error while updating finance: ${error}` });
    }
  },

  // List all finances
  async findAll(req, res) {
    try {
      const { page } = req.params;
      const limit = 6;

      const Finance = await finance.findAndCountAll({
        order: [["date", "DESC"]],
        include: {
          all: true,
        },
        limit: limit,
        offset: parseInt(page),
      });
      return res.json({ Finance });
    } catch (error) {
      return res.json({ msg: `Error while listing finances: ${error}` });
    }
  },

  // List the finances by their category id
  async findByCategoryId(req, res) {
    try {
      const { id } = req.params;

      var balance = 0;
      var sum = 0;

      const category = await Category.findOne({
        where: { id: id },
      });

      console.log(category);

      const Finance = await finance.findAll({
        where: {
          categoryId: parseInt(id),
        },
        include: {
          all: true,
        },
      });

      if (Finance.length === 0) {
        return res.json({ category, balance });
      } else {
        for (sum of Finance) {
          balance = balance + sum.value;
        }
        return res.json({ category, balance });
      }
    } catch (error) {
      return res.json({ msg: `Error while listing: ${error}` });
    }
  },

  // Filter finances by a specific date
  async filterByDate(req, res) {
    try {
      const { initialDate, finalDate } = req.params;

      const Finance = await finance.findAndCountAll({
        include: {
          all: true,
        },
        where: {
          date: {
            [Op.gte]: initialDate,
            [Op.lte]: finalDate,
          },
        },
      });
      return res.json({ Finance });
    } catch (error) {
      return res.json({ msg: `Error while listing finances: ${error}` });
    }
  },

  // Delete a specific finance by id
  async delete(req, res) {
    try {
      const { id } = req.params;
      await finance.destroy({
        where: {
          id: id,
        },
      });
      return res.json({ msg: `Finance deleted successfully!` });
    } catch (error) {
      return res.json({ msg: `Error while deleting finance: ${error}` });
    }
  },
};
