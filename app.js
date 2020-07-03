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
var signupRouter = require('./routes/auth/signup');
var loginRouter = require('./routes/auth/login');
var logoutRouter = require('./routes/auth/logout');
var listUsersRouter = require('./routes/users/list');
var profileRouter = require('./routes/users/profile');
var editProfileRouter = require('./routes/users/edit-profile');
var availabilityRouter = require('./routes/users/availability');
var reviewRouter = require('./routes/reviews/review');
var conversationRouter = require('./routes/conversation/conversation');
var sendMessageRouter = require('./routes/conversation/send-message');

app.use('/', indexRouter);
app.use('/user/signup', signupRouter);
app.use('/user/login', loginRouter);
app.use('/user/logout', logoutRouter);
app.use('/user/profile', listUsersRouter);
app.use('/user/profile', profileRouter);
app.use('/user/profile', editProfileRouter);
app.use('/user/profile', availabilityRouter);
app.use('/user/profile', reviewRouter);
app.use('/user/send-message', conversationRouter);
app.use('/user/send-message', sendMessageRouter);

module.exports = app;