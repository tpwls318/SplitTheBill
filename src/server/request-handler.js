const db = require('./db/index');


exports.testGet = function(req, res) {
    console.log('@@@@@@@@@');
    res.send('Hello Get!!!!');
}

exports.testPost = (req, res) => {
    console.log('$$$$$$$');
    console.log(`${req.body.name}: { 쏜사람 : ${req.body.people[0]}, 쏘아올린돈${req.body.amount} }`);
    _addTable(req.body);
    res.send('Hello POST!!!!');
}

//   server.get('/users', (req, res)=>{
//     User.findAll({
//       where: { 
//         id : {
//           $lt: 5
//         }
//       }
//     }).then( users => {
//       res.send( users.map( user => user.name) )
//       }    
//     )
//   })
// SELECT count(`Meal`.`id`) FROM `Meal`  LEFT OUTER JOIN ( `User_Meals` INNER JOIN `User` ON `Users`.`id` = `User_Meal`.`UserId`) ON `Meal`.`id` =
// `User_Meal`.`MealId` WHERE `Meal`.`id` = 1;
const _countPeople = () => {
    let User=db.User;
    let Meal=db.Meal;
    let UserMeal=db.UserMeal;
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
                amount: table.amount
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


