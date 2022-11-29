"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Finance extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Finance.init(
    {
      date: DataTypes.DATEONLY,
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      value: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Finance",
    }
  );
  return Finance;
};
