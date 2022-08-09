 module.exports = function(sequelize, dataTypes){
    let alias="Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING
        },
        collection:{
            type: dataTypes.STRING
        },
        discount:{
            type: dataTypes.STRING
        },
        id_category: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "products",
        timestamps: false,
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: 'id_category',
        });
        Product.hasMany(models.Image, {
            as: "images",
            foreignKey: 'id_product',
        });
    }

    return Product;
 }