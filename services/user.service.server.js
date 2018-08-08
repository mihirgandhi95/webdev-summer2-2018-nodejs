/*
module.exports = function (app){
    var userModel = require('../models/user/user.model.server');

    app.get('/api/user', findAllUsers);
    app.post('/api/user', createUser);

    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user).then(function(user){
                res.send(user);
        });
    }

    function findAllUsers(req, res){
        userModel.findAllUsers().then(
            function(users){
                res.send(users);
            }
        )


    }
}
*/






module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put('/api/update', updateUser);

    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                req.session['currentUser'] = user;
                // res.json(user);
                res.send(user);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        // res.send(req.session['currentUser']);
       var user = req.session['currentUser'];
       userModel.findUserById(user._id).then(function(user) {
           res.json(user);
       });

    }

    function updateUser(req,res){
        var user = req.body;
        userModel.updateUser(user);
        res.send("updated the user");

    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
}