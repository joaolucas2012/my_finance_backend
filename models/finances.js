"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Finances extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  Finances.init(
    {
      date: DataTypes.DATEONLY,
      category_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      value: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Finances",
    }
  );
  return Finances;
};
