import Sequelize, { Model } from "sequelize";

class Genres extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
         },
         {
            sequelize,
         }
      );
   }

   // static associate(models) {
   //    this.hasMany(models.Game, { foreignKey: "genre_id", as: "games" });
   // }
}

export default Genres;
