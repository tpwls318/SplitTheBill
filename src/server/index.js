const express = require('express');
const next = require('next');
const test = require('./request-handler');
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
  
  server.get('/test', test.testGet);
  server.get('/tmp', test.tmp);
  server.post('/test', test.testPost);
  server.post('/login', test.handleLogin);
  server.post('/signup', test.handleSignup);
  
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

