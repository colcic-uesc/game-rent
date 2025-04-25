import Sequelize, { Model } from "sequelize";

class Genre extends Model {
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

   static associate(models) {
      this.hasMany(models.Game);
   }
}

export default Genre;
