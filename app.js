var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
const dotenv = require("dotenv");

var indexRouter = require('./routes/index');
let userRouter = require('./routes/userRouter');
let payRouter = require("./routes/payRouter");

const port = process.env.PORT || '3001'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', userRouter)
app.use('/payment', payRouter);

app.listen(port, ()=>{
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
