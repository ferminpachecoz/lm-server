module.exports = function(sequelize, dataTypes){
    let alias="Category";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        img_path:{
            type: dataTypes.STRING
        },
        banner:{
            type: dataTypes.INTEGER
        },
        header:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "category",
        timestamps: false,
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: "category",
            foreignKey: 'id_category',
        });
    }

    return Category;
 }