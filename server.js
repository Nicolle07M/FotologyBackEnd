const express = require('express');
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

/**
 * Importar rutas
 */
const fotografosRoutes = require('./routes/fotografosRoutes');

const port = process.env.PORT || 3001;

// Configuración del middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración de express-session
app.use(session({
  secret: 'your_secret_key', // Cambia esto por una clave secreta más segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia esto a true si usas HTTPS
}));

// Inicializar Passport.js
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');
app.set('port', port);

/**
 * Llamando las rutas
 */
fotografosRoutes(app);

// Dirección IP V4 de la máquina, consultar con ipconfig
server.listen(port, '192.168.20.174' || 'localhost', function() {
    console.log('App Node.js ' + process.pid + ' ejecutando en ' + server.address().address + ':' + server.address().port);
});

/** RUTAS ***********************************************/
app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
});

app.get('/test', (req, res) => {
    res.send('Estas en la ruta TEST');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
