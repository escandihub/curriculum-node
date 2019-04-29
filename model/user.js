'use-strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    usuario: String,
    clave: String,
    email: String,
    creado: String,
    preferencias: {
        color: String,
        letra: String,
        fondo: String,
        foto: String,
        curriculum: Object
    },

});
module.exports = mongoose.model('User', userSchema);