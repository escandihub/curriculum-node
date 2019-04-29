const User = require('../model/user');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');

function GET_ALL(req, res) {
    User.find({}).exec((err, users) => {
        if (!err) {
            if (users) {
                res.status(200).send(users);
            }
        } else {
            res.status(500).json({ 'error': 'servidor' });
        }
    });
}

function GET(req, res) {
    User.findById(req.params.id).exec((err, user) => {
        if (!err) {
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).json({ 'message': 'El usuario no existe' });
            }
        } else {
            res.status(500).json({ 'message': 'Error en el servidor (USUARIOS)' });
        }
    });
}

function POST(req, res) {
    if (req.body.email && req.body.clave) {
        User.findOne({ "email": req.body.email }, (err, user) => {
            if (!err && !user) {
                let data = req.body;
                let user = new User;
                user.usuario = data.usuario;
                user.email = data.email;
                user.creado = Date.now();
                user.clave = bcrypt.hashSync(data.clave)
                user.preferencias.color = data.preferencias.color;
                user.preferencias.letra = data.preferencias.letra;
                user.preferencias.fondo = data.preferencias.fondo;
                user.preferencias.foto = null;
                user.curriculum = null;
                user.save((err) => {
                    if (!err) {
                        res.status(201).json({ user });
                    } else {
                        res.status(500).json({ 'error': 'Error al guardar (USUARIO)' });
                    }
                });
            } else {
                res.status(500).json({ 'message': 'Error en email ya existe' });
            }
        });
    } else {
        res.json({ 'message': 'El email y contraseña son requeridos' });
    }
}

function PUT(req, res) {
    User.updateOne({ _id: req.id }, req.body, (err, userUpdated) => {
        if (!err) {
            if (userUpdated) {
                res.status(202).json();
            } else {
                res.status(404).json();
            }
        } else {
            res.status(500).json({ 'error': 'Error al actualizar (USUARIO)' });
        }
    });
}

function DELETE(req, res) {

}

function LOGIN(req, res) {
    if (req.body.clave && req.body.email) {
        User.findOne({ "email": req.body.email }).exec((err, user) => {
            if (!err) {
                if (user) {
                    if (bcrypt.compareSync(req.body.clave, user.clave)) {
                        res.status(200).json({ "user": user, "auth": true });
                    } else {
                        res.status(404).json({ "message": "Email o contraseña incorrecta", "auth": false });
                    }
                } else {
                    res.status(404).json({ "message": "Usuario no existe", "auth": false });
                }
            } else {
                res.status(500).json({ "error": "Error en el servidor (LOGIN)" });
            }
        });
    } else {
        res.status(400).json({ "error": "Proporcione un email y contraseña", "auth": false });
    }
}
module.exports = {
    GET_ALL,
    GET,
    POST,
    PUT,
    DELETE,
    LOGIN
}