const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')

//const instacncia = new productos();
// creo una app de tipo express
const app = express();
const handlebars = require("express-handlebars")
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie:{ maxAge: 1000}
}))
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('main');

  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.render('main');
        else res.send({ status: 'Logout ERROR', body: err })
    })
}) 

app.get('/login', (req, res) => {
  let {usuario} =  req.query
  console.log(usuario)
  res.render('list', { usuario: usuario});
    /*if (!req.query.username || !req.query.password) {
        res.send('login fallo');
    } else if (req.query.username == "admin" || req.query.password == "1234") {
        req.session.user = "admin";
        req.session.admin = true;
        res.send('login correcto!');
    }*/
})

const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
