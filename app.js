'use-strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const CvController = require('./controller/cv');
const UserController = require('./controller/user');
const bcrypt = require('bcrypt-nodejs');
const User = require('./model/user');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/')
    },
    filename: function(req, file, cb) {
        cb(null, bcrypt.hashSync(Date.now()).replace('\\', "(") + '.jpg');

    }
});
var unpload = multer({ storage: storage });

app.set('image', path.join(__dirname, 'images'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

app.get('/image/:file', (req, res) => {
    var file = req.params.file;
    try {
        res.sendFile(__dirname + '/images/' + file);
    } catch (e) {
        res.status(404).send({ 'message': 'Avatar no disponible' });
    }
});
app.post('/user/photo', unpload.single('avatar'), (req, res, next) => {
    User.findByIdAndUpdate(req.body.id, { "preferencias.foto": req.file.filename }, (err, user) => {
        if (!err) {
            res.json({ 'message': 'Imagen guardada', 'user': user });
        } else {
            res.json({ 'message': 'Imagen no guardada' });
        }
    });
});
app.get('/user', UserController.GET_ALL);
app.get('/user/:id', UserController.GET);
app.post('/user', UserController.POST);
app.put('/user/:id', UserController.PUT);
app.delete('/user/:id', UserController.DELETE);
app.post('/user/login', UserController.LOGIN);


app.get('/cv', CvController.GET_ALL);
app.get('/cv/:id', CvController.GET);
app.post('/cv', CvController.POST);
app.get('*', (req, res) => {
    res.send({
        'error': 'Lo sentimos esta pagina no existe',
        'status': 404,
        'time': Date.now()
    });
});

module.exports = app;