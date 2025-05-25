const { Model, DataTypes } = require("sequelize");

class Payments extends Model {
   static init(sequelize) {
      super.init(
         {
            id: {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            id_aluguel: {
               type: DataTypes.INTEGER,
               allowNull: false,
            },
            valor: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
            },
            data_pagamento: {
               type: DataTypes.DATE,
               defaultValue: DataTypes.NOW,
            },
            metodo: {
               type: DataTypes.ENUM('pix', 'cartao', 'boleto'),
               allowNull: false,
            },
            status: {
               type: DataTypes.ENUM('aprovado', 'pendente', 'cancelado'),
               defaultValue: 'pendente',
            },
         },
         {
            sequelize,
            tableName: 'payments',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
         }
      );
   }

   static associate(models) {
      this.belongsTo(models.Rent, { foreignKey: "id_aluguel", as: "rent" });
   }

   findAll() {
      console.log("Fetching all payments");
   }
}

module.exports = Payments;
