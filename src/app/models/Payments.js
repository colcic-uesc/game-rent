const { Model, DataTypes } = require("sequelize");

class Payments extends Model {
   static init(sequelize) {
      super.init(
         {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.FLOAT,
            status: DataTypes.STRING,
            yt_link: DataTypes.STRING,
            capa_jogo: DataTypes.STRING,
            platform_id: DataTypes.INTEGER,
            genre_id: DataTypes.INTEGER,
         },
         {
            sequelize,
         }
      );
   }

   static associate(models) {
      this.belongsTo(models.Rent, { foreignKey: "fk_aluguel", as: "rent" });
   }
}
module.exports = Payments;
