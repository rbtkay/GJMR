const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

/**
 * Admin register a new user:
 *  body : {
 *      email (string)
 *      last_name (string)
 *      first_name (string)
 *      role (string)
 *  }
 */
exports.adminCreateUser = (req, res) => {
    let new_user = new User(req.body);

    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    new_user.password = bcrypt.hashSync("password", salt);

    try {
        new_user.save((error, user) => {
            if (error) {
                res.status(400);
                res.json({ message: error });
            }
            else {
                res.status(201);
                user = user.toObject();
                delete user.password
                res.json(user)
            }
        })
    }
    catch (e) {
        res.status(500);
        res.json({ message: "Erreur serveur." });
    }
}