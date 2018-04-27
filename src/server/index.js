const express = require('express')
const next = require('next');
const test = require('./request-handler');
const db = require('./db/index');
const bodyParser = require('body-parser');
const cors = require('cors');

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

  var User=db.User;
  server.get('/users', (req, res)=>{
    User.findAll({
      where: { 
        id : {
          $lt: 5
        }
      }
    }).then( users => {
      res.send( users.map( user => user.name) )
      }    
    )
  })
  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/test', test.testGet);

  server.post('/test', test.testPost);
  
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

