let db = require('../database/models');
const { Op } = require('sequelize');
module.exports = {
  create:(req, res)=>{
    db.Admin.findOne(
      {
        where:{
          [Op.and]:[
            {password: req.body.password},
            {email: req.body.email}
          ]
        }
      }
      )
      .then(data => res.status(200).json(data))
  }
}