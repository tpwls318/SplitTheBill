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
    
    db.User.findOne({
        where: { name: req.body.id }
    }).then(function(result) {
        //console.log(result.dataValues);
        if(result) {
            console.log('id 중복');
        } else {
            bcrypt.hash(req.body.password, null, null, function(err, hash) {
                if(err) {
                  console.log('error');
                  res.send();
                } else {
                    console.log(hash);
                    db.User.create({
                        name: req.body.name,
                        userid: req.body.id,
                        password: req.body.password
                    }).then(function (user) {
                        console.log('save data to DB complete!!');
                        res.send();
                    }).catch(function(err) {
                        console.log(err);
                        res.send();
                    })
                }
            });  
        }
    }).catch(function(err){
        console.log(err);
        res.send();
    });
}

exports.handleLogin = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    
    db.User.findOne({
        where: { userid: req.body.userid }
    }).then(function(result) {
        console.log(result.dataValues);
        // res.json(result);
    }).catch(function(err){
         //TODO: error handling
    });


    res.send('Hello Login!!!!');
}

