'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pagamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      data_pagamento: {
        type: Sequelize.DATE
      },
      metodo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      id_aluguel: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pagamentos');
  }
};