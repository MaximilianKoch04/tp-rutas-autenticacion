const express = require('express');
const session = require('express-session');
const { randomBytes } = require('node:crypto');
const path = require('node:path');

const app = express();
const router = express.Router();

// Cuentas de prueba para el TP local.
const usuarios = [
  { nombre: 'alumno', clave: 'alumno123', rol: 'usuario' },
  { nombre: 'admin', clave: 'admin123', rol: 'admin' }
];

app.use(express.json());
app.use(session({
  secret: randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false
}));

router.get('/publica', (req, res) => {
  res.json({ mensaje: 'Bienvenido a la ruta pública' });
});

router.post('/login', (req, res) => {
  const { nombre, clave } = req.body || {};
  const usuario = usuarios.find(u => u.nombre === nombre && u.clave === clave);

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Nombre o clave incorrectos' });
  }

  req.session.usuario = { nombre: usuario.nombre, rol: usuario.rol };
  res.json({ mensaje: 'Sesión iniciada', usuario: req.session.usuario });
});
function requerirSesion(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ mensaje: 'Tenés que iniciar sesión' });
  }

  next();
}

router.get('/privada', requerirSesion, (req, res) => {
  res.json({
    mensaje: 'Accediste a la ruta privada',
    usuario: req.session.usuario
  });
});

function requerirAdmin(req, res, next) {
  if (req.session.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Se requiere el rol admin' });
  }

  next();
}

router.get('/admin', requerirSesion, requerirAdmin, (req, res) => {
  res.json({
    mensaje: 'Bienvenido al panel de administración',
    usuario: req.session.usuario
  });
});

app.use('/api', router);
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});