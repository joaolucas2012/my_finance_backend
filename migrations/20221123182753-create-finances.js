"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Finances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: {
          notEmpty: { msg: "Campo de data não pode ser vazio" },
        },
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "Campo de categoria não pode ser vazio" },
        },
        references: {
          model: "Category",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Campo de título não pode ser vazio" },
        },
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        validate: {
          notEmpty: { msg: "Campo de valor não pode ser vazio" },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Finances");
  },
};
