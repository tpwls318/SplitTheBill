const express = require('express');
const next = require('next');
const reqHandler = require('./request-handler');
const db = require('./db/index');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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
    saveUninitialized: true
  }));
  server.use(cors());
  // Parse JSON (uniform resource locators)
  server.use(bodyParser.json());
  // Parse forms (signup/login)
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })
  

  server.get('/test', reqHandler.testGet);
  server.get('/tmp', reqHandler.tmp);
  server.get('/getRooms', reqHandler.getRooms);
  server.get('/getTables', reqHandler.getTables);
  server.get('/logout', reqHandler.logout);

  server.post('/test', reqHandler.testPost);
  server.post('/login', reqHandler.handleLogin);
  server.post('/signup', reqHandler.handleSignup);

  
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

