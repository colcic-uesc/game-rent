'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('aluguel_jogos', {
      id_aluguel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alugueis',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      id_jogo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'games',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('aluguel_jogos');
  }
};
