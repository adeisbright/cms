const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session      = require('express-session')
const mongoose = require("mongoose")
const dotenv   = require("dotenv").config()
const helmet   = require("helmet")
const cors = require("cors")
const MongoDBStore = require('connect-mongodb-session')(session) 
const { v4: uuidv4 } = require('uuid'); 
const AdminRouter = require("./routes/admin")
const BlogRouter = require("./routes/blog") 
const CustomerRouter = require("./routes/customer")
const app = express();
app.use(cors())
//"mongodb://127.0.0.1:27017/blog" 
let dbName = "mongodb://127.0.0.1:27017/blog" 
const store           = new MongoDBStore({
  uri :dbName, 
  collection : "sessions"
}) 
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
	cookie : {
    maxAge : 1728e5 ,
    
    //sameSite : true , 
    //secure : true , 
    //httpOnly : true ,
	} , 
	secret : process.env.SESSION_SECRET ,   
  resave : false , 
  store : store , 
  name  :"taxsession",
	saveUninitialized : true , 
	unset : "destroy" , 
	genid : (req) => {
		return uuidv4()
	}
	
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())

app.use(express.static(path.join(__dirname, 'public')));

app.use("/" , AdminRouter)
app.use("/" , BlogRouter)
app.use("/" , CustomerRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const CONFIG = { 
  uri : dbName,  
  OPTIONS : { 
    useNewUrlParser : true , 
    useCreateIndex : true , 
    poolSize : 10 , 
    keepAlive : true , 
    useUnifiedTopology : true , 
    keepAliveInitialDelay : 3e6
  }
}


mongoose.connect(CONFIG.uri, CONFIG.OPTIONS) 
let db = mongoose.connection 
db.on('error' , console.error.bind(console , 'MongoDB connection error'))
db.once('open' , console.info.bind(console , 'Connection to the database was ok')) 
mongoose.set('debug', true) // For debugging purpose 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


