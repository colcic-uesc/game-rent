const { Model, DataTypes } = require("sequelize");

class Aluguel extends Model {
  static init(sequelize) {
    super.init(
      {
        id_usuario: DataTypes.INTEGER,
        data_aluguel: DataTypes.DATE,
        data_devolucao: DataTypes.DATE,
        status: DataTypes.ENUM('em andamento', 'finalizado'),
      },
      {
        sequelize,
        tableName: 'alugueis'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "id_usuario", as: "usuario" });

    // Muitos jogos em um aluguel
    this.belongsToMany(models.Game, {
      through: models.AluguelJogos,
      foreignKey: "id_aluguel",
      as: "jogos"
    });
  }
}

module.exports = Aluguel;
