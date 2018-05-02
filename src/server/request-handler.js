const db = require('./db/index');
let User=db.User;
let Meal=db.Meal;
let Room=db.Room;
let UserUser=db.UserUser;
let UserMeal=db.UserMeal;
let people= ['전한길', '서의환', '한영재', '이원복', '백영재', '박세진', '이준표', '이슬', '김재현', '춘봉안'];
var bcrypt = require('bcrypt-nodejs');
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
exports.testGet = function(req, res) {
    console.log('@@@@@@@@@');
    res.send('Hello Get!!!!');
}
exports.getTables = (req, res) => {
    let data = [];
    // req.body['roomname']='immersive6';
    name = req.body.roomname;
    Room.findOne({
        where:{
            name
        },
    })
    .then( room => {
        Meal.findAll({
            where: {
                roomId: room.id
            },
        })
        .then( meals => {
            //meals = meals.map( meal => `${meal.buyer}가 쏜 ${meal.name}` )        
            return _mealMap( meals, data )        
        }).then( ()=>{
            res.send(data)
        } )
    }) 
}
// const start = async () => {
//     await asyncForEach([1, 2, 3], async (num) => {
//       await waitFor(50)
//       console.log(num)
//     })
//     console.log('Done')
//   }
const _mealMap = async (meals, data) => {
    await asyncForEach( meals, async meal => {
        await User.findAll({
            where: {},
            include:[
                {
                    model: Meal,
                    through: {
                    attributes: ['name'],
                    },
                    where: {
                        name: meal.name,
                    }
                }
            ]
        }).then( users => {
            users = users.map( user => user.name)
            data.push( Object.assign(meal.dataValues, {members: users}) )    
        })  
    })
}
exports.createRoom = (req, res) => {
    console.log(req.body);
    
    req.body.people.push(req.body.logedinUser)
    _addRoom(req.body.roomname, req.body.people)
    res.send('');
}

exports.getRooms = (req, res) => {
    Room.findAll({
        where: {
        },
        include:[
            {
                model: User,
                through: {
                attributes: ['name'],
                }
            }
        ]
    }).then( rooms => {
        rooms = rooms.map( room => room.name )
        console.log(      
        );
        res.send(rooms)
    }).then(function () {
        console.log('Everything worked, check the database.');
    }).catch(function () {
        console.log('Something went wrong. Catch was executed.');
    });
    // res.send()
    // User.findAll({
    //     where: { 
    //       name:  {
    //           $in : people
    //         }
    //     }
    //   }).then( users => {  

    //     meal.addUsers(users)
    //   })
}

exports.testPost = async (req, res) => {
    console.log('$$$$$$$');
    let userArr = req.body.people;
    userArr = userArr.filter( user=> user!==req.body.logedinUser);
    console.log(`${req.body.name}: { 
        쏜사람 : ${req.body.logedinUser}, 
        쏘아올린돈 : ${req.body.amount} , 
        받을 N(${userArr.length+1})빵머니 : ${req.body.amount / (userArr.length+1)},
        빛장이들:${userArr}
    }`);
    let room = await _addRoom( req.body.roomname, people);
    let table = await _addTable( req.body, userArr );
    let mealRoom = await _addMealtoRoom( req.body.roomname, req.body.name );
    let toFrom = await _addToFrom( userArr, req.body.logedinUser, req.body.amount/(userArr.length+1) );
    res.send('Hello POST!!!!');
}

  const _addTable = (table, people) => {
    return db.sequelize.sync({
        force: false
    }).then(function() {
        // Step One: Create a Meal
        Meal.create({
            name: table.name,
            amount: table.amount,
            buyer: table.logedinUser
        }).then(function (meal) {
            // Step Two: Create User
            User.findAll({
                where: { 
                  name:  {
                      $in : people
                    }
                }
              }).then( users => {  
                meal.addUsers(users)
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
    return db.sequelize.sync({
        force: false
    }).then(function() {
        // Step One: Create a Room
        Room.findOrCreate({
            where: {
                name,
            }, 
        }).spread( (room, created) => {
            // Step Two: Create User
            console.log('////////////////');
            console.log(room.get({
            plain: true
            }), created)
            return people.map( person => {
                User.findOrCreate({
                    where: {
                        name: person,
                    }, 
                })
                .spread((user, created) => {
                    console.log('////////////////');
                    console.log(user.get({
                    plain: true
                    }))
                    console.log(created)
                    return room.addUsers([user]); 
                })
            })
        })
        .then(function () {
            console.log('Everything worked, check the database.');
        }).catch(function () {
            console.log('Something went wrong. Catch was executed.');
        });
    })
}
 _addMealtoRoom = (roomname, name) => {
    return Room.findOne({
        where: { 
          name: roomname
        }
      }).then( room => {
        Meal.update({RoomId: room.id},
            {where: {name}, returning: true}).then(function(result) {
                 console.log(`result !!!!!!!!!!!! ${result}`);
            }).catch(function(err) {
                 console.log(err);          
            });
      })
 }
 
 const _addToFrom = ( froms, to, amount) => {
    return db.sequelize.sync({
        force: false
    }).then(function() {
        // Step One: Create a Room
        User.findAll({
            attributes: ['id'],
            where: { 
              name:  {
                  $in : froms
                }
            },
          }).then( froms => {
            User.findOne({
                attributes: ['id'],
                where: { 
                    name: to
                  },   
            }).then( to => {
                froms.map( from => {
                console.log(`to_id : ${to.id},  from_ids : ${froms}`);
                UserUser.findOrCreate({
                    where: {
                        from_id: from.id,
                        to_id: to.id
                    }, 
                    defaults: {
                        amount
                    }
                })
                .spread((useruser, created) => {
                    console.log('////////////////');
                    console.log(useruser.get({
                    plain: true
                    }))
                    console.log(created)
                    })
                })
            })             
          })    
        .then(function () {
            console.log('Everything worked, check the database.');
        }).catch(function (err) {
            console.log(`Something went wrong. ${err}.`);
        });
    })
}
exports.handleSignup = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    User.findOne({
        where: { userID: req.body.userID }
    }).then(function(result) {
        if(result) {
            console.log('id 중복');
            res.send(false)
        } else {
            bcrypt.hash(req.body.password, null, null, function(err, hash) {
                if(err) {
                  console.log(err);
                  res.send();
                } else {
                    console.log(hash);
                    db.User.create({
                        name: req.body.name,
                        userID: req.body.userID,
                        password: hash
                    }).then(function (user) {
                        console.log('save data to DB complete!!');
                        res.send(true);
                    }).catch(function(err) {
                        console.log(err);
                        res.send(err);
                    })
                }
            });  
        }
    }).catch(function(err){
        console.log(err);
        res.send();
    });
}

exports.handleConfirmId = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    User.findOne({
        where: { userID: req.body.userID }
    }).then(function(result) {
        if(result) {
            console.log('id 중복');
            res.send(false);
        } else {
            console.log('사용 가능');
            res.send(true);
        }
    }).catch(function(err){
        console.log(err);
        res.send();
    });
}

exports.getSid = function(req, res) {
    res.json(req.session.sid);
}
exports.logout = function(req, res) {
    delete req.session.sid;
    res.send('logout');
}
exports.handleLogin = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    
    db.User.findOne({
        where: { userID: req.body.userID }
    }).then(function(result) {
        if(result) {
            bcrypt.compare(req.body.password, result.dataValues.password, function(err, truth) {
                if(err) {
                    console.log(err);
                } else {
                    if(truth) {
                        console.log('login success');
                        req.session.sid = result.dataValues.userID;
                        console.log('sssssssssssssssss',req.session);
                        res.send(true);
                        return;
                    } else {
                        console.log('login fail');
                        res.send(false);
                        return;
                    }
                }
            });
        } else {
            console.log('not exist');
            res.send('not exist');
        }
        // res.json(result);
        // res.send('Hello Login!!!!');
    }).catch(function(err){
         //TODO: error handling
         res.send(err);
    });
}
exports.getFriends = function(req, res) {
    console.log('%%%%%%');
    res.send('@@@@@@');
}

exports.tmp = function(req, res) {
    console.log('%%%%%%');
    res.send('@@@@@@');
}


