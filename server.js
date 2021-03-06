var express = require('express');
var bodyParser = require('body-parser');
const mongoose  = require ('mongoose');

 mongoose.connect('mongodb://heroku_5mt8jhl0:sct6obtal4hi2ihu8446fba752@ds117422.mlab.com:17422/heroku_5mt8jhl0');
//  mongoose.connect('mongodb://localhost/webdev-summer2-2018-nodejs');


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        req.headers.origin);
    // res.header("Access-Control-Allow-Origin",
    //     "http://localhost:4200");



    

    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    cookie: {maxAge: 1800000},
    rolling: true
}));


app.get('/', function (req,res){
    res.send('Hello World')
})



app.get('/message/:theMessage', function (req,res){

    var theMessage = req.params['theMessage'];
    res.send(theMessage);
})

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name',getSession);
// app.get('/api/session/get',getSessionAll);
// app.get('/api/session/reset',resetSession);


function setSession(req,res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] =  value;
    res.send(req.session);
}

function getSession(req,res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}


/*var userModel = require('./models/user/user.model.server');
// userModel.createUser({
//     username: 'mihir', password: 'mihir'
// });

var users = [];
userModel.findAllUsers()
    .then(function(users){
        console.log(users);
    });
console.log(users);*/

var userService = require('./services/user.service.server');
userService(app);
require('./services/section.service.server')(app);
require('./services/quiz.service.server')(app);
require('./services/question.service.server')(app);
//app.listen(4000)


app.listen(process.env.PORT || 4000);