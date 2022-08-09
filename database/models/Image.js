module.exports = function(sequelize, dataTypes){
  let alias="Image";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      path: {
          type: dataTypes.STRING
      },
      id_product: {
          type: dataTypes.INTEGER
      }
  }

  let config = {
      tableName: "images",
      timestamps: false,
  }

  let Image = sequelize.define(alias, cols, config);

  Image.associate = function(models){
      Image.belongsTo(models.Product, {
          as: "images",
          foreignKey: 'id_product',
      });
  }

  return Image;
}