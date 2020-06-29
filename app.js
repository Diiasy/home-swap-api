require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();

var cors = require('cors');
app.use(cors({
    origin: true, //put the site address to make it more safe ["url"]
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

mongoose
    .connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.log(err);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Protect Middleware
function protectMiddleWare(req,res,next){
    console.log("Protect Middleware called");
    if(req.session.user){
        next();
    } else {
        res.redirect("/users/login");
    }
}

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/users/signup');
var loginRouter = require('./routes/users/login');
var logoutRouter = require('./routes/users/logout');

app.use('/', indexRouter);
app.use('/user/signup', signupRouter);
app.use('/user/login', loginRouter);
app.use('/user/logout', logoutRouter);

module.exports = app;