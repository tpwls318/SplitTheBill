var express = require('express');
var mysql = require('mysql');
var mysql2 = require('mysql2');
var app = express();
var Sequelize = require('sequelize');
// sequelize


var sequelize = new Sequelize('bob', 'root', 'kkhs1125', { 
  dialect: 'mysql', 
  operatorsAliases : true,
  host: 'localhost',
  port     : 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// define ( create table )
const User = sequelize.define('User', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING(32), allowNull: false},
  userID: {type: Sequelize.STRING(32), allowNull: true},
  password: {type: Sequelize.STRING(32), allowNull: true},
}, {
  classMethods: {},
  freezeTableName: true,
  timestamps: true
});
const Room = sequelize.define('Room', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING(32), allowNull: false},
}, {
  classMethods: {},
  freezeTableName: true,
  timestamps: true
});
const Meal = sequelize.define('Meal', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING(32), allowNull: false},
  amount: {type: Sequelize.INTEGER}
}, {
  classMethods: {},
  freezeTableName: true,
  timestamps: true
});
const UserRoom = sequelize.define('User_Room', {
});
const UserMeal = sequelize.define('User_Meal', {
});
const UserUser = sequelize.define('User_User', {
  amount : {type: Sequelize.INTEGER}
});
User.belongsToMany(Room, { through: UserRoom });
Room.belongsToMany(User, { through: UserRoom });
User.belongsToMany(Meal, { through: UserMeal });
Meal.belongsToMany(User, { through: UserMeal });
Room.hasMany(Meal, {as: 'Menu'})
User.belongsToMany(User, { through: UserUser, as: 'UserUser', foreignKey: 'from_id'});
User.belongsToMany(User, { through: UserUser, as: 'UserUser2', foreignKey: 'to_id'});
sequelize.sync({
  force: false
}).then(function () {
      console.log('Everything worked, check the database.');
      _countPeople();
  }).catch(function () {
      console.log('Something went wrong. Catch was executed.');
  });


/*  Create a '/users' route that responds to 
    a GET request with all users in the database */

    // app.get('/users', (req, res)=>{
    //   User.findAll({
    //     where: { 
    //       id : {
    //         $lt: 5
    //       }
    //     }
    //   }).then( users => {
    //     res.send( users.map( user => user.name) )
    //     }    
    //   )
    // })
module.exports = { 
  sequelize,
  User,
  Meal,
  Room,
  UserMeal,
  UserRoom,
  UserUser,
};