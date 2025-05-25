'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alugueis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data_aluguel: {
        allowNull: false,
        type: Sequelize.DATE 
      },
      data_devolucao: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('em andamento', 'finalizado')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alugueis');
  }
};