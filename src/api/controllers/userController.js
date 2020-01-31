const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.user_login = (request, response) => {
    let { email, password } = request.body;

    console.log('password')
    console.log(password)


    User.findOne({ email }, (error, user) => {
        console.log("userPassword");
        console.log(user.password);

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) {
            response.status(401);
            response.json({ message: 'Auth Failed' });
        } else {
            jwt.sign({ email: user.email, role: user.role }, process.env.JWT_KEY, { expiresIn: "10m" }, (jwtError, token) => {
                if (error) {
                    response.status(500);
                    response.json({ message: "Erreur serveur" });
                }
                else {
                    response.status(200);
                    response.json({ token });
                }
            })
        }
    })
}



