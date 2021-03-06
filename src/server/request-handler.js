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

exports.getUsers = (req, res) => {
    User.findAll({
        where:{}
    }).then( users => {
        console.log(`id: ${req.session}`);
        console.log(users.map( user=>user.userID).filter( userID => userID&&(userID!=req.session.displayID) ))
        res.send(users.map( user=>user.userID).filter( userID => userID&&(userID!==req.session.displayID)))
    } )
}

exports.getRoomMembers = (req, res) => {
    const {roomname} = req.body
    User.findAll({
        where:{},
        include:[
            {
                model: Room,
                through: {
                attributes: ['name'],
                },
                where: {
                    name: roomname,
                }
            }
        ]
    }).then( users => {
        console.log('usermap',users.map( user=>user.userID).filter( userID => userID&&(userID!=req.session.displayID) ))
        res.send(users.map( user=>user.userID).filter( userID => userID&&(userID!==req.session.displayID)))
    } )
}

exports.deleteRow = (req, res) => {
    console.log(`req.body!!!!!!@@@@@ ${req.body}`);
    
    const { from, to, amount, meal, roomId } = req.body;
    _addToFrom( [from], to, (0-amount) );
    console.log(`from:${from},to: ${to}, amount: ${amount},meal: ${meal},roomId: ${roomId}`);
    
    User.findOne({
        where:{
            userID: from
        }
    }).then( user => {
        UserMeal.destroy({
            where:{
                UserId: user.id,
                MealId: meal
            }
        })
    }) 
    Meal.findOne({where: {id:meal}})
    .then( curMeal => (
        Meal.update({amount: curMeal.amount-amount},
            {where: {id:meal}, returning: true}).then(function(result) {
                 console.log(`result !!!!!!!!!!!! ${result}`);
            }).catch(function(err) {
                 console.log(err);          
            })
    )
    )

}
exports.deleteTable = (req, res) => {
    const {id} = req.body
    Meal.destroy({
        where:{
            id
        }
    })
}

exports.getTables = (req, res) => {
    let tables = [];
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
            return _mealMap( meals, tables )        
        }).then( ()=>{
            res.send({ tables })
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
            let members = users.map( user => user.userID)
            data.push( Object.assign(meal.dataValues, {members}) )    
        })  
    })
}
exports.createRoom = async(req, res) => {
    const {people, roomname} = req.body;
    console.log('people!!!!!! : ',people);
    
    if(people.includes(req.session.displayID)) people.push(req.session.displayID)
    _addRoom(roomname, people)
    res.send('room added')
}

exports.getRooms = (req, res) => {
    const { userID } = req.body;
    // const { userID } = { userID: req.session.displayID };
    console.log(req.session);
    
    console.log(`userID : ${userID}`);

    Room.findAll({
        where: {
        },
        include:[
            {
                model: User,
                through: {
                attributes: ['name'],
                },
                where: {
                    userID
                }
            }
        ]
    }).then( rooms => {
        rooms = rooms.map( room => room.name )
        const data = {
            rooms,
        }
        console.log(`data : ${data.rooms}`);
        
        res.send(data)
    }).then(function () {
        console.log('Everything worked, check the database.');
    }).catch(function () {
        console.log('Something went wrong. Catch was executed.');
    });
}

exports.testPost = async (req, res) => {
    console.log('$$$$$$$');
    let userArr = req.body.people;
    userArr = userArr.filter( user=> user!==req.body.logedinUser);
    console.log(`${req.body.name} (${req.body.roomname}): { 
        쏜사람 : ${req.body.logedinUser}, 
        쏘아올린돈 : ${req.body.amount} , 
        받을 N(${userArr.length+1})빵머니 : ${req.body.amount / (userArr.length+1)},
        빛장이들:${userArr}
    }`);
    // let users = await _getUsers();
    // let room = await _addRoom( req.body.roomname, people);
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
        }).then( (meal) => ( 
            // Step Two: Create User
            User.findAll({
                where: { 
                  userID:  {
                      $in : people
                    }
                }
              }).then( users => {  
                console.log('user!@#@!#!@#@!$!@$!@$@!$@!$!@',users);
                
                return meal.addUsers(users)
              })
        )).then(function () {
            console.log('Everything worked in addTable, check the database.');
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
            User.findAll({
                where: {
                    userID: {
                        $in : people
                    }
                }, 
            })
            .then( users => {
                console.log(users.map(user=>user.userID));
                return room.addUsers(users); 
            })
        })
        .then(function () {
            console.log('Everything worked, check the database.');
        }).catch(function () {
            console.log('Something went wrong. Catch was executed.');
        });
    })
}
 const _addMealtoRoom = (roomname, name) => {
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
                    if (!created) {
                        UserUser.update({
                            amount: useruser.amount+amount
                        },
                        {
                            where : {
                                from_id: from.id,
                                to_id: to.id
                            }
                        })
                    }
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

exports.signup = (req, res) => {
    res.send('/');
    // bcrypt.hash(req.body.password, null, null, function(err, hash) {
    //     if(err) {
    //       console.log(err);
    //       res.send();
    //     } else {
    //         User.findOrCreate({
    //             where: { userID: req.body.userID },
    //             defaults: {
    //                 name: req.body.name,
    //                 password: hash
    //             }
    //         })                
    //         .spread((user, created) => {
    //             // res.send('/')
    //             // res.redirect('/');
    //             console.log(user.get({
    //             plain: true
    //             }))
    //             if (!created) {
    //             }
                
    //         }).then( ()=>{
    //             res.redirect('/');
    //         })
    //     }
    // });  
}
exports.handleSignup = function(req, res) {
    console.log('$$$$$$$');
    console.log(req.body);
    User.findOne({
        where: { userID: req.body.userID },
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
    
    console.log(`req.session.displayID , ${req.session.displayID}`);
    // res.send({a:1});
    req.session.save( ()=>{
        const { displayID }= req.session;
        res.send(displayID);
    })
    
}
exports.logout = function(req, res) {
    delete req.session.displayID;
    console.log(req.session);
    req.session.save(()=>{
        res.redirect('/');
    }) 
}

exports.handleLogin = function(req, res) {
    // console.log('$$$$$$$');
    // console.log(req.body);
    const { userID, password } = req.body;
    db.User.findOne({
        where: { userID }
    }).then(function(result) {
        if(result) {
            bcrypt.compare(password, result.dataValues.password, function(err, truth) {
                if(err) {
                    console.log(err);
                } else {
                    if(truth) {
                        console.log('login success');
                        req.session.displayID = userID;
                        req.session.save( ()=>res.send(req.session))
                        console.log('sssssssssssssssss',req.session);
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


