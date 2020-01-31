// src/api/controllers/postController.js
const mongoose = require('mongoose');
const Post = require('../models/userModel');

exports.getStudentModules = (request, response) => {
    //SchoolYearOfStudent.findOne({studentId: request.params.student_id}) --> schoolYearId
    //TeacherModuleOfSchoolYear.find({schoolYearId}) --> moduleId
    //forEach : Module.findById ({moduleId}) ; 
    //  Note.findOne({module_id, student_id: request.params.student_id })
    let send_response = {};

    SchoolYearOfStudent.findOne({
            student_id: request.params.student_id
        })
        .then((error, result) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Utilisateur introuvable."
                })
            } else {
                response.status(200);
                let {
                    school_year_id
                } = JSON.parse(result);
                let modules_fragment = getTeachersAndModulesFromSchoolYear(school_year_id);
                let modules_ids = modules_fragment.map(module => module.module_id);
                let teachers_ids = modules_fragment.map(module => module.teacher_id);
                let modules = getModules(modules_ids);
                let teachers = getTeachers(teachers_ids);
                let notes = getNotesFromModulesAndStudent(modules_ids, request.params.student_id);
                modules = modules.map(module => {
                    module.teacher = teachers.filter(
                        teacher => teacher.teacher_id === module.teacher_id
                    )[0]
                    module.note = notes.filter(
                        note => note.module_id === module.module_id
                    )[0];
                    return module;
                });
                send_response.modules = modules;
            }
        }).catch(e => {
            res.status(500);
            console.log(e);
            res.json({
                message: "Erreur serveur"
            })
        });
}

const getTeachersAndModulesFromSchoolYear = (send_response) => {
    TeacherModuleOfSchoolYear.find({
            school_year_id: send_response.school_year_id
        })
        .then((error, result) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Promotion de l'utilisateur introuvable."
                })
            } else {
                response.status(200);
                return JSON.parse(result);
            }
        }).catch(e => {
            res.status(500);
            console.log(e);
            res.json({
                message: "Erreur serveur"
            })
        });
};

const getModules = (modules_ids) => {
    Modules.find({
            module_id: {
                $in: modules_ids
            }
        })
        .then((error, result) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Aucun module disponible."
                })
            } else {
                response.status(200);
                return JSON.parse(result);
            }
        }).catch(e => {
            res.status(500);
            console.log(e);
            res.json({
                message: "Erreur serveur"
            })
        });
};

exports.Note = (req, res) => {
    let new_post = new Post(req.body);

    try {
        new_post.save((error, post) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Il manque des infos"
                });
            } else {
                res.status(201);
                res.json(post)
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({
            message: "Erreur serveur"
        })
    }
}

exports.get_a_post = (req, res) => {
    try {
        Post.findById(req.params.post_id, (error, post) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Id introuvable"
                });
            } else {
                res.status(201);
                res.json(post)
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({
            message: "Erreur serveur"
        })
    }
}

exports.update_a_post = (req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.post_id, req.body, {
            new: true
        }, (error, post) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Id introuvable"
                });
            } else {
                res.status(200);
                res.json(post)
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({
            message: "Erreur serveur"
        })
    }
}

exports.delete_a_post = (req, res) => {
    try {
        Post.findByIdAndRemove(req.params.post_id, (error) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Id introuvable"
                });
            } else {
                res.status(200);
                res.json({
                    message: "Article supprimé"
                })
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({
            message: "Erreur serveur"
        })
    }
}