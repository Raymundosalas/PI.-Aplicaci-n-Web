const db = require('../config/db');

exports.obtenerPeliculas = (req, res) => {

    db.query('SELECT * FROM peliculas', (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.agregarPelicula = (req, res) => {

    const { titulo, genero, anio, descripcion } = req.body;

    const sql = `
        INSERT INTO peliculas(titulo, genero, anio, descripcion)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql,
        [titulo, genero, anio, descripcion],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Película agregada correctamente'
            });
        });
};

exports.actualizarPelicula = (req, res) => {

    const { id } = req.params;

    const { titulo, genero, anio, descripcion } = req.body;

    const sql = `
        UPDATE peliculas
        SET titulo=?, genero=?, anio=?, descripcion=?
        WHERE id=?
    `;

    db.query(sql,
        [titulo, genero, anio, descripcion, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Película actualizada correctamente'
            });
        });
};

exports.eliminarPelicula = (req, res) => {

    const { id } = req.params;

    db.query(
        'DELETE FROM peliculas WHERE id=?',
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Película eliminada correctamente'
            });
        });
};
