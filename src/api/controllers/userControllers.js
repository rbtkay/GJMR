const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { requestManagment, serverError } = require("../functions/errorManagment");


/**
 * User login:
 *  body : {
 *      email (string)
 *      password (string)
 *  }
 */
exports.userLogin = (request, response) => {
    let { email, password } = request.body;

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


/**
 * Admin register a new user:
 *  body : {
 *      email (string)
 *      last_name (string)
 *      first_name (string)
 *      role (string)
 *  }
 */
exports.createUser = (req, res) => {
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

/**
 * Admin update a user:
 *  body : {
 *      user_id (string)
 *  }
 */
exports.updateUser = (req, res) => {
    const { email, last_name, first_name, role } = new User(req.body);

    // console.log(updated_user);
    console.log(req.body.user_id);

    User.updateOne({ _id: req.body.user_id, $set: { email, last_name, first_name, role } })
        .then((result, error) => {
            res.status(200);
            res.json(result)
        }).catch(error => serverError(error, response));
}

/**
 * Admin delete a user:
 *  body : {
 *      user_id (string)
 *  }
 */
exports.deleteUser = (req, res) => {
    console.log(req.body.user_id);
    User.findByIdAndDelete((req.body.user_id), (error, result) => {
        res.status(200);
        res.json({ message: "user deleted properly" })
    }).catch(error => { serverError(error, response) });
}

/**
 * Admin gets all user depending on the queryString:
 *  param : {
 *      user_role (string) [student, teacher]
 *  }
 */
exports.getUsers = (req, res) => {
    console.log(req.params.user_role);
    User.find({ role: req.params.user_role }).then((users, error) => {
        if (!!error) {
            serverError(error, response)
        } else {
            res.status(200)
            res.json(users)
        }
    })
}

exports.getAllUsers = (req, res) => {
    User.find({}).then((users, error) => {
        if (!!error) {
            serverError(error, response)
        } else {
            res.status(200)
            res.json(users)
        }
    })
}




