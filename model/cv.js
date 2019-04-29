'use-strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cvSchema = new Schema({
    dato: {
        nombre: String,
        fecha_nacimiento: String,
        estado_civil: String,
        nacionalidad: String,
        idiomas: [String]
    },
    experiencia: [{
        empresa: String,
        puesto: String,
        periodo: String,
        descripcion: String
    }],
    reconocimiento: [{
        nombre: String,
        procedencia: String,
        fecha: String,
        descripcion: String
    }],
    estudio: [{
        institucion: String,
        documento: String,
        periodo: String,
        descripcion: String
    }],
    contacto: {
        direccion: String,
        telefono: String,
        correo: String
    },
    habilidad: [String],
    referencia: [{
        nombre: String,
        puesto: String,
        telefono: String,
        correo: String
    }],
});

module.exports = mongoose.model('Cv', cvSchema);