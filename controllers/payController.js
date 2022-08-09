const { default: axios } = require("axios");

module.exports = {
  create: async(req,res)=>{
    const url = "https://api.mercadopago.com/checkout/preferences";
    let info = req.body;
    let finalPrice = req.body.price;
    if(req.body.discount){
      finalPrice = req.body.price * (100-req.body.discount);
    }
    const body = {
      payer_email: info.email,
      items:[
        {
          title: info.name,
          description: info.description,
          category_id: info.category.title,
          quantity: 1,
          picture_url: "https://static.zara.net/photos///2021/I/0/1/p/6045/211/401/2/w/373/6045211401_1_1_1.jpg?ts=1634559831928",
          currency_id: "ARS",
          unit_price: finalPrice,
          payer: {
            name: info.first_name,
            surname: info.lastname,
            email: info.email,
            address: {
              zip_code: info.zip_code,
              street_name: info.street_name,
              street_number: info.street_number
            }
          }
        }
      ],
      back_urls:{
        failure: "https://www.w3schools.com/",
        pending: "https://www.w3schools.com/jsref/default.asp",
        success: "https://www.w3schools.com/react/default.asp"
      },
      statement_descriptor: "Clob Prendas"
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