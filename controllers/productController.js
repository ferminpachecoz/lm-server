const db = require('../database/models');
const {Op} = require("sequelize");
const {sequelize} = require("../database/models");

const productController={
  create: (req,res)=>{
    db.Product.create({...req.body})
      .then(data=>{
        let y = data.dataValues;
        let x = req.files;
        let z = [];
        x.forEach(item => {
          z.push({path: item.originalname, id_product: y.id})
        });
        db.Image.bulkCreate(z)
          .then(res.status(200).json(data))
      })
  },
  list: (req,res)=>{
    db.Product.findAll({
      include: [{association: "images"}, {association: "category"}]
    })
      .then(data => res.status(200).json(data))
  },
  selected: (req,res)=>{
    db.Product.findOne({
      where: {
        id: req.body.id
      },
      include: [{association: "images"}]
    })
    .then(data => res.status(200).json(data))
  },
  edit: (req,res)=>{
    db.Product.update({...req.body}, {where:{id:req.body.id}})
      .then(()=>{
        if(req.files.length > 0){
          db.Image.destroy({where: {id_product: req.body.id}})
            .then(()=>{
              let x = req.files;
              let z = [];
              x.forEach(item => {
                z.push({path: item.originalname, id_product: req.body.id})
              });
              db.Image.bulkCreate(z)
                .then(res.status(200).json({status: "ok"}))
            })
        }else{
          res.status(200).json({status:"ok"})
        }
      })
  },
  delete: (req, res)=>{
    db.Product.destroy({where: {id: req.body.id}})
      .then(data => res.status(200).json(data))
  },
  createCategory: (req, res)=>{
    db.Category.create({
      title: req.body.title,
      img_path: req.file.originalname
    })
      .then(data => res.status(200).json(data))
  },
  updateCategory: (req, res)=>{
    if(req.file.originalname){
      db.Category.update({title: req.body.title, img_path: req.file.originalname}, {where:{id: req.body.id}})
        .then(data => res.status(200).json(data))
    }else{
      db.Category.update({title: req.body.title}, {where:{id: req.body.id}})
        .then(data => res.status(200).json(data))
    }
  },
  deleteCategory: (req, res)=>{
    db.Category.destroy({
      where:{
        id: req.body.id
      }
    })
      .then(data => res.status(200).json(data))
  },
  listCategory: (req,res)=>{
    db.Category.findAll()
      .then(data => res.status(200).json(data))
  },
  onlyProduct: (req, res)=>{
    let id = req.params.id;
    db.Product.findByPk(id, {include:[{association: "images"}, {association: "category"}]})
      .then(data => res.status(200).json(data))
  },
  search: async(req, res)=>{
    let str = req.query.query;

    const [results, metadata] = await sequelize.query("SELECT * FROM products WHERE name LIKE '%"+str+"%'")

    await res.status(200).json(results);
  }
}
module.exports = productController;