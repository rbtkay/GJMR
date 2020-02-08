const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

const StudentInSchoolYear = require('./studentInSchoolYearControllers');
// const  = require('./studentInSchoolYearControllers');


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
            } else {
                const isPasswordCorrect = bcrypt.compareSync(
                    password,
                    user.password
                );
                if (!isPasswordCorrect) {
                    response.status(401);
                    response.json({ message: "Auth Failed" });
                } else {
                    jwt.sign(
                        { id: user._id, role: user.role },
                        process.env.JWT_KEY,
                        { expiresIn: "10m" },
                        (jwtError, token) => {
                            if (jwtError) {
                                response.status(500);
                                response.json({ message: "Erreur serveur" });
                            } else {
                                response.status(200);
                                response.json({
                                    token,
                                    _id: user._id,
                                    role: user.role,
                                    last_name: user.last_name,
                                    first_name: user.first_name,
                                });
                            }
                        }
                    );
                }
            }
        })
        .catch(error => {
            console.error(error);
            response.status(500);
            response.json({ message: "Erreur serveur" });
        });
};

exports.getUsers = (request, response) => {
    User.find({}).then((users, error) => {
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
    let new_user = new User(
        {
            email: request.body['email'],
            last_name: request.body['last_name'],
            first_name: request.body['first_name'],
            role: request.body['role'],
            password: ""
        }
    );

    console.log(new_user);

    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    new_user.password = bcrypt.hashSync("password", salt);

    //TODO: Add Verfication for user role before saving
    try {
        new_user.save((error, user) => {
            if (error) {
                response.status(400);
                response.json({ message: error });
            } else {
                user = user.toObject();
                delete user.password;
                console.log(user);
                if (request.body['role'] === 'student') {
                    const newStudentInYearPromise = StudentInSchoolYear.addStudentToSchoolYear({ student_id: user._id, school_year_id: request.body['school_year'] })
                    newStudentInYearPromise.then(result => {
                        response.status(201); //FIXME: the status is not returned
                        response.json(user);
                    })
                }
                else if (request.body['role'] === ['teacher']) {
                    console.log("after promise student")
                } else {
                    response.status(201)
                    response.json(user);
                }
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

    User.findByIdAndUpdate(_id, {
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
    User.findById(request.params.user_id).then((users, error) => {
        if (!!error) {
            serverError(error, response);
        } else {
            response.status(200);
            response.json(users);
        }
    });
};

exports.getUsersById = (request, response) => {
    User.find({
        _id: {
            $in: request.body
        }
    }).then((users, error) => {
        if (!!error) {
            serverError(error, response);
        } else {
            response.status(200);
            response.json(users);
        }
    });
};

// FIXME : module id n'existe pas dans User
exports.getTeachersByModules = (request, response) => {
    User.find({
        module_id: {
            $in: request.body
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
