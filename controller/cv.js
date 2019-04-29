Cv = require('../model/cv');
User = require('../model/user');

function GET_ALL(req, res) {
    Cv.find({}).exec((err, cvs) => {
        if (!err) {
            if (cvs) {
                res.send(cvs);
            } else {
                res.send({ 'message': 'No hay curriculums' })
            }
        } else {
            res.send({ 'error': 'servidor no disponible' });
        }
    });
}

function GET(req, res) {
    Cv.findById(req.params.id).exec((err, cv) => {
        if (!err) {
            if (cv) {
                res.send(cv);
            }
        } else {
            res.send({ 'error': 'Error en el servidor', 'status': 500 });
        }
    })

}

function POST(req, res) {
    var curriculum = new Cv;
    curriculum.dato = req.body.dato;
    curriculum.habilidad = req.body.habilidad;
    curriculum.experiencia = req.body.experiencia;
    curriculum.reconocimiento = req.body.reconocimiento;
    curriculum.estudio = req.body.estudio;
    curriculum.contacto = req.body.contacto;
    curriculum.referencia = req.body.referencia;
    curriculum.save((err) => {
        if (!err) {
            User.findById(req.body.id).exec((err, user) => {
                if (!err) {
                    if (user) {
                        console.log(curriculum.id);
                        user.curriculum = curriculum.id;
                        user.save();
                        res.status(201).send({ "curriculum": curriculum, "user": user });
                    } else {
                        res.status(404).json({ "message": "Id invalido" });
                    }
                } else {
                    res.status(500).json({ "message": "Error al guardar (CV)" });
                }
            });
        } else {
            res.status(500).send({ "message": "Error al guardar (CV)" });
        }
    });
}

module.exports = {
    GET_ALL,
    GET,
    POST
};