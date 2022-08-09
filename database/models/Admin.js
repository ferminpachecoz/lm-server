module.exports = function(sequelize, dataTypes){
  let alias="Admin";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      password: {
          type: dataTypes.STRING
      },
      email: {
          type: dataTypes.STRING
      }
  }

  let config = {
      tableName: "admins",
      timestamps: false,
  }

  let Admin = sequelize.define(alias, cols, config);

  return Admin;
}