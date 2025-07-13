import Sequelize, { Model } from "sequelize";

class Genre extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
            is_active: Sequelize.BOOLEAN,
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
