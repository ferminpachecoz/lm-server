const { default: axios } = require("axios");

module.exports = {
  create: async(req,res)=>{
    const url = "https://api.mercadopago.com/checkout/preferences";
    let info = req.body;
    /* let finalPrice = req.body.price;
    if(req.body.discount){
      finalPrice = req.body.price * (100-req.body.discount);
    } */
    let arr = [];
    info.forEach(item=>{
      let obj = {
        id: item.id,
        title: item.title,
        description: item.description,
        quantity: item.units,
        picture_url: `../client/public/${info.path}`,
        currency_id: "ARS",
        unit_price: item.price,
      }
      arr.push(obj)
    })
    const body = {
      items: [...arr],
      back_urls:{
        failure: "https://www.w3schools.com/",
        pending: "https://clob-tienda.herokuapp.com/",
        success: "https://clob-tienda.herokuapp.com/"
      },
      statement_descriptor: "Le Marchê"
    }
    const payment = await axios.post(url, body, {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })
    await res.status(200).json(payment.data)
  }
}