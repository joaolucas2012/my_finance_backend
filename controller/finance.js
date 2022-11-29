const sequelize = require("sequelize");
const Op = sequelize.Op;
const model = require("../models");
const finance = model.Finance;

module.exports = {
  // Create a new finance
  async create(req, res) {
    try {
      const { date, categoryId, title, value } = req.body;
      const Finance = await finance.create({
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
      const Finance = await finance.update(
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
      const limit = 5;

      const Finance = await finance.findAndCountAll({
        order: [["date", "ASC"]],
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

  // Filter finances by a specific date
  async filterByDate(req, res) {
    try {
      const { page, initialDate, finalDate } = req.params;
      const limit = 5;

      const Finance = await finance.findAndCountAll({
        limit: limit,
        offset: parseInt(page),
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
      const Finance = await finance.destroy({
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
