const { Model, DataTypes } = require("sequelize");

class AluguelJogos extends Model {
  static init(sequelize) {
    super.init(
      {
        id_aluguel: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        id_jogo: {
          type: DataTypes.INTEGER,
          primaryKey: true
        }
      },
      {
        sequelize,
        tableName: "aluguel_jogos"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Aluguel, {
      foreignKey: "id_aluguel",
      as: "aluguel"
    });

    this.belongsTo(models.Game, {
      foreignKey: "id_jogo",
      as: "jogo"
    });
  }
}

module.exports = AluguelJogos;
