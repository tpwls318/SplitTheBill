const db = require('./db/index');
var bcrypt = require('bcrypt-nodejs');

exports.testGet = function(req, res) {
    console.log('@@@@@@@@@');
    res.send('Hello Get!!!!');
}

exports.testPost = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    res.send('Hello POST!!!!');
}

exports.handleSignup = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    db.User.findOne({
        where: { name: 'sergei' }
    }).then(function(result) {
        console.log(result.dataValues);
        if(result) {
            console.log('id 중복');
        } else {
            bcrypt.hash(req.body.password, null, null, function(err, hash) {
                if(err) {
                  console.log('error');
                } else {
                  db.User.create
                }
            });  
        }
    }).catch(function(err){
        console.log(err);
    });


    
    res.send('Hello POST!!!!');
}

exports.handleLogin = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    
    db.User.findOne({
        where: { name: 'sergei' }
    }).then(function(result) {
        console.log(result.dataValues);
        // res.json(result);
    }).catch(function(err){
         //TODO: error handling
    });


    res.send('Hello Login!!!!');
}

