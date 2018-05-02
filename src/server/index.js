const express = require('express');
const next = require('next');
const reqHandler = require('./request-handler');
const db = require('./db/index');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: null,
  database: 'bob',
};
var util = require('./util').checkUser;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(options),
  }));
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(cors());
  // Parse JSON (uniform resource locators)
  server.use(bodyParser.json());
  // Parse forms (signup/login)
  server.use(bodyParser.urlencoded({ extended: true }));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy(
    (userId, password, done) => {
      db.User.findOne({ userID }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(user);
        
        return done(null, user);
      });
    }
  ))
  server.get('/group/:title', (req, res) => {
    const actualPage = '/group/table'
    const queryParams = { title: req.params.title }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/test', reqHandler.testGet);
  server.get('/tmp', reqHandler.tmp);
  server.get('/getRooms', reqHandler.getRooms);
  server.get('/logout', reqHandler.logout);
  server.get('/getSid', reqHandler.getSid);
  server.get('/getFriends', reqHandler.getFriends);

//   server.post(
//     '/login',
//     passport.authenticate(
//       'local', 
//       { 
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: false 
//       })
// );
  server.post('/getTables', reqHandler.getTables);
  server.post('/test', reqHandler.testPost);
  server.post('/login', reqHandler.handleLogin);
  server.post('/signup', reqHandler.handleSignup);
  server.post('/signup2', reqHandler.signup);
  server.post('/confirmID', reqHandler.handleConfirmId);
  server.post('/createRoom', reqHandler.createRoom);
  server.post('/deleteTable', reqHandler.deleteTable);
  server.post('/deleteRow', reqHandler.deleteRow);
  
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

