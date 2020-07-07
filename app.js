require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();

var cors = require('cors');
app.use(cors({
    origin: [process.env.client_origin_a, process.env.client_origin_b],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

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
    if(req.session.user){
        next();
    } else {
        res.status(401).json({message: 'Please login to view this content'});
    }
}

var signupRouter = require('./routes/auth/signup');
var loginRouter = require('./routes/auth/login');
var logoutRouter = require('./routes/auth/logout');
var listUsersRouter = require('./routes/users/list');
var profileRouter = require('./routes/users/profile');
var deleteProfileRouter = require('./routes/users/delete-profile');
var editProfileRouter = require('./routes/users/edit/edit-profile');
var deletePictureRouter = require('./routes/users/edit/delete-picture');
var availabilityRouter = require('./routes/calendar/availability');
var reviewRouter = require('./routes/reviews/review');
var addReviewRouter = require('./routes/reviews/add-review');
var conversationRouter = require('./routes/conversation/conversation');
var messageRouter = require('./routes/conversation/message');
var searchRouter = require('./routes/users/search');

app.use('/user/profile', protectMiddleWare);
app.use('/user/signup', signupRouter);
app.use('/user/login', loginRouter);
app.use('/user/logout', logoutRouter);
app.use('/user/list', listUsersRouter);
app.use('/user/profile', profileRouter);
app.use('/user/profile', deleteProfileRouter);
app.use('/user/profile', editProfileRouter);
app.use('/user/profile', deletePictureRouter);
app.use('/user/profile', availabilityRouter);
app.use('/user/profile', reviewRouter);
app.use('/user/review', protectMiddleWare, addReviewRouter);
app.use('/conversation', protectMiddleWare, conversationRouter);
app.use('/message', protectMiddleWare, messageRouter);
app.use('/user/search', searchRouter);

module.exports = app;