import Sequelize, { Model } from "sequelize";

class Platform extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
         },
         {
            sequelize
         }
      );
   }

   static associate(models) {
      // Uma plataforma pode ter muitos jogos
      this.hasMany(models.Game, { foreignKey: "platform_id", as: "games" });
   }
}

export default Platform;
