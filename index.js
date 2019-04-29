'use-strict'
const mongoose = require('mongoose');
require('dotenv').config();
const hostname = '127.0.0.1'
const hostnamedb = 'ds123399.mlab.com'
const port = 80 || NODE_ENV;
const app = require('./app');
const db = 'mean';
const portdb = 23399;
mongoose.connect(`mongodb://alex:01mk56@${hostnamedb}:${portdb}/${db}`, { useNewUrlParser: true });
app.listen(port, () => {
    console.log(`server:: servidor corriendo en http://${hostname}:${port}`);
})

// mongoose.connect(`mongodb://Xnecro:01mk56...@${hostnamedb}:${portdb}/${db}`, (err) => {
//     if (!err) {
//         console.log(`mongoo:: db iniciada en ://${hostnamedb}:${portdb}/${db}`);
//         app.listen(port, () => {
//             console.log(`server:: servidor corriendo en http://${hostname}:${port}`);
//         });
//     } else {
//         console.log('Error al iniciar el servidor');
//     }
// });