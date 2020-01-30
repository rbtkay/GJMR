const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = 3000;

mongoose.connect('mongodb://mongo/db_feedback_ipssi');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.type('html');
    res.status(200);
    res.end('<h1>This is the beginning</h1>')
})

server.listen(port, hostname);
