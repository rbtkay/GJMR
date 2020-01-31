const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = 3000;

mongoose.connect(`mongodb://mongo/${process.env.DB_NAME}`);

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const userRoutes = require('./api/routes/userRoutes');
userRoutes(server);

const adminRoutes = require('./api/routes/adminRoutes');
adminRoutes(server);
// server.get('/', (request, response) => {
//     response.type('html');
//     response.status(200);
//     response.end('<h1>This is the beginning</h1>')
// })


// Routage du module
const moduleRoute = require('./api/routes/moduleRoute');
moduleRoute(server);

server.listen(port, hostname);

