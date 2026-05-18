const express = require('express');
const router = express.Router();

const peliculasController = require('../controllers/peliculasController');
const auth = require('../middleware/auth');

router.get('/', auth, peliculasController.obtenerPeliculas);

router.post('/', auth, peliculasController.agregarPelicula);

router.put('/:id', auth, peliculasController.actualizarPelicula);

router.delete('/:id', auth, peliculasController.eliminarPelicula);

module.exports = router;
