const db = require('./db/index');

let User=db.User;
let Meal=db.Meal;
let UserMeal=db.UserMeal;
let people= ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '춘봉안'];

var bcrypt = require('bcrypt-nodejs');

exports.testGet = function(req, res) {
    console.log('@@@@@@@@@');
    res.send('Hello Get!!!!');
}

exports.testPost = (req, res) => {
    console.log('$$$$$$$');
    console.log(`${req.body.name}: { 쏜사람 : ${req.body.people[0]}, 쏘아올린돈${req.body.amount} }`);
    _addRoom( req.body.roomname, people);
    _addTable( req.body );
    _addMealtoRoom( req.body.roomname, req.body.name )
    res.send('Hello POST!!!!');
}


//   server.get('/users', (req, res)=>{
    // User.findAll({
    //   where: { 
    //     id : {
    //       $lt: 5
    //     }
    //   }
    // }).then( users => {
    //   res.send( users.map( user => user.name) )
    //   }    
    // )
//   })
// SELECT count(`Meal`.`id`) FROM `Meal`  LEFT OUTER JOIN ( `User_Meals` INNER JOIN `User` ON `Users`.`id` = `User_Meal`.`UserId`) ON `Meal`.`id` =
// `User_Meal`.`MealId` WHERE `Meal`.`id` = 1;

const _countPeople = () => {
    Meal.count({
        where:{
            'id': 1
        },
    include: [{
        model: User,
        through: {
        attributes: ['createdAt'],
        }
        }]  
 }).then(c => {
    console.log("There are " + c + " projects with an id greater than 25.")
     })
} 
const _addTable = (table) => {
    
        db.sequelize.sync({
            force: false
        }).then(function() {
            // Step One: Create a Meal
            db.Meal.create({
                name: table.name,
                amount: table.amount,
            }).then(function (meal) {
                // Step Two: Create User
                return table.people.map( person => {
                    return db.User.create({
                        name: person,                 
                    }).then(function (user) {
                        // Step Three: Add user to meal
                        return meal.addUsers([user])
                    });
                })
            }).then(function () {
                console.log('Everything worked, check the database.');
                _countPeople();
            }).catch(function () {
                console.log('Something went wrong. Catch was executed.');
            });
        })
}
const _addRoom = ( name, people ) => {
    db.sequelize.sync({
        force: false
    }).then(function() {
        // Step One: Create a Room
        db.Room.create({
            name
        }).then(function (room) {
            // Step Two: Create User
            return people.map( person => {
                return db.User.create({
                    name: person,                 
                }).then(function (user) {
                    // Step Three: Add user to room
                    return room.addUsers([user])
                });
            })
        })
        // .then( room => room.addUsers(people[0]) )
        .then(function () {
            console.log('Everything worked, check the database.');
        }).catch(function () {
            console.log('Something went wrong. Catch was executed.');
        });
    })
}
 _addMealtoRoom = (roomname, name) => {
    db.Room.findOne({
        where: { 
          roomname
        }
      }).then( room => {
        db.Meal.findOne({
            where: {
                name
            }
        }).then( meal => {
            room.addMeals(meal)
            console.log(room, meal);
            
        })
        }    
      )
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


