const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.user_login = (request, response) => {
    let { body } = request;
    
    console.log('body');
    console.log(body);

    User.findOne(body, (error, user) => {
        jwt.sign({ email: user.email, role: user.role }, process.env.JWT_KEY, { expiresIn: "10m" }, (jwtError, token) => {
            if (jwtError) {
                console.log(jwtError);
                response.status(500);
                response.json({ message: "Erreur serveur" });
            }
            else {
                response.status(200);
                response.json({ token });
            }
        })
    })
}



