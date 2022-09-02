const fs = require('fs')

if (fs.existsSync('../client/public/images/banner1.png')){
  console.log("Exists");
}else{
  console.log("Not exists");
}