const fs = require('fs');
let x = fs.existsSync('../client/public/prenda7.jpg')
if(x){
  console.log('true');
}else{
  console.log('false');
}
