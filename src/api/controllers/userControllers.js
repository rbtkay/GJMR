const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

/**
 * User login:
 *  body : {
 *      email (string)
 *      password (string)
 *  }
 */
exports.userLogin = (request, response) => {
    let { email, password } = request.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                response.status(401);
                response.json({ message: "Auth Failed" });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            console.log(isPasswordCorrect);
            if (!isPasswordCorrect) {
                response.status(401);
                response.json({ message: "Auth Failed" });
            } else {
                jwt.sign(
                    { email: user.email, role: user.role },
                    process.env.JWT_KEY,
                    { expiresIn: "10m" },
                    (jwtError, token) => {
                        if (jwtError) {
                            response.status(500);
                            response.json({ message: "Erreur serveur" });
                        } else {
                            response.status(200);
                            response.json({ token });
                        }
                    }
                );
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500);
            response.json({ message: "Erreur serveur" });
        });
};

exports.getUsers = (request, response) => {
    console.log(request.body.user_id)
    User.find(
        request.body.user_id
            ? {
                '_id': {
                    $in: request.body.user_id
                }
            }
            : {}
    ).then((users, error) => {
        if (!!error) {
            serverError(error, response);
        } else {
            response.status(200);
            response.json(users);
        }
    });
};

/**
 * Admin register a new user:
 *  body : {
 *      email (string)
 *      last_name (string)
 *      first_name (string)
 *      role (string)
 *  }
 */
exports.createUser = (request, response) => {
    let new_user = new User(request.body);

    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    new_user.password = bcrypt.hashSync("password", salt);

    try {
        new_user.save((error, user) => {
            if (error) {
                response.status(400);
                response.json({ message: error });
            } else {
                response.status(201);
                user = user.toObject();
                delete user.password;
                response.json(user);
            }
        });
    } catch (e) {
        response.status(500);
        response.json({ message: "Erreur serveur." });
    }
};

/**
 * Admin update a user:
 *  body : {
 *      user_id (string)
 *  }
 */
exports.updateUser = (request, response) => {
    const { email, last_name, first_name, role } = new User(request.body);
    const user_id = mongoose.Types.ObjectId(request.body);

    User.findByIdAndUpdate(user_id, {
        $set: { email, last_name, first_name, role }
    }) //FIXME: si le document n'exist pas la request time out
        .then(result => {
            response.status(200);
            response.json(result);
        })
        .catch(error => {
            response.json({ message: error });
        });
};

/**
 * Admin delete a user:
 *  body : {
 *      user_id (string)
 *  }
 */
exports.deleteUser = (request, response) => {
    User.findByIdAndDelete(request.body.user_id, (error, result) => {
        response.status(200);
        response.json({ message: "user deleted properly" });
    }).catch(error => {
        serverError(error, response);
    });
};

/**
 * Admin gets all user depending on the queryString:
 *  param : {
 *      user_role (string) [student, teacher]
 *  }
 */
exports.getUsersByRole = (request, response) => {
    User.find({ role: request.params.user_role }).then((users, error) => {
        if (!!error) {
            serverError(error, response);
        } else {
            response.status(200);
            response.json(users);
        }
    });
};

exports.getUserById = (request, response) => {
    User.findById(request.body.user_id).then((users, error) => {
        if (!!error) {
            serverError(error, response);
        } else {
            response.status(200);
            response.json(users);
        }
    });
};

exports.getTeachersByModules = (request, response) => {
    User.find({
        module_id: {
            $in: request.body.modules_id
        }
    })
        .then((results, error) =>
            requestManagment(
                response,
                results,
                error,
                "Aucun professeur n'a été trouvé."
            )
        )
        .catch(error => serverError(error, response));
};
