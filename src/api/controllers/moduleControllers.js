const mongoose = require("mongoose");
const Module = require("../models/moduleModel");
const ModuleInSchoolYear = require("../controllers/moduleOfSchoolYearControllers");
// fucntions
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

exports.getModules = (request, response) => {
    Module.find(request.body)
        .then((modules, error) => {
            requestManagment(
                response,
                modules,
                error,
                "Aucun module n'a été trouvé."
            );
        })
        .catch(error => serverError(error, response));
};

// récupérer un module par son id
exports.getModuleById = (request, response) => {
    Module.findById(request.params.module_id)
        .then((module, error) => {
            if (!!error) {
                response.status(400);
                response.json({ message: "Id introuvable" });
            } else {
                response.status(200);
                response.json(module);
            }
        })
        .catch(error => serverError(error, response));
};

/**
 * Create a module
 * 
 * body{
 *      name: (string),
 *      teacher_id: (string)
 * }
 */

exports.createModule = (request, response) => {
    console.log("request.body", request.body);
    let new_module = new Module({
        name: request.body["module_title"],
        teacher_id: request.body["teacher_id"]
    });
    new_module.save()
        .then((module_result, error) => {
            if (error) {
                response.status(400);
                response.json({ message: 'Il manque des infos' });
                console.log(error);
            }
            else {
                console.log("request in controller", request.body)
                const new_module_in_school_year = ModuleInSchoolYear.addModuleToSchoolYear({ module_id: module_result._id, school_year_id: request.body['school_year'] })
                new_module_in_school_year.then(result => {
                    console.log("after promise user", result)
                    response.status(201);
                    response.json(module_result);
                }).catch(e => {
                    response.status(500);
                    response.json({ message: "erreur serveur " })
                })
            }
        })
        .catch(error => serverError(error, response));

};

// mettre à jour un module
exports.updateModule = (request, response) => {

    Module.findByIdAndUpdate(request.params.module_id, request.body, { new: true })
        .then((module, error) => {
            requestManagment(
                response,
                module,
                error,
                "Aucune modification a été faite."
            )
        })
        .catch(error => serverError(error, response));
};

// supprimer un module
exports.deleteModule = (request, response) => {
    Module.findByIdAndDelete(request.params.module_id)
        .then((module, error) => {
            if (error) {
                response.status(400);
                response.json({ message: 'Il manque des infos' });
                console.log(error);
            }
            else {
                response.status(201);
                response.json({
                    message: 'Module supprimé',
                    module: module
                });
            }
        })
        .catch(error => serverError(error, response));
};

/**
 * params : school_year_id
 * return array
 */
exports.getModulesIdBySchoolYearId = (request, response) => {
    ModuleOfSchoolYear.find({
        school_year_id: request.params.school_year_id
    })
        .then((results, error) =>
            requestManagment(
                response,
                results,
                error,
                "Aucun module n'a été trouvé."
            )
        )
        .catch(error => serverError(error, response));
};

/**
 * Recuperer les modules d'un intervenant
 * param : teacher_id
 * return array
 */
exports.getModulesByTeacher = (request, response) => {
    Module.find({ teacher_id: request.params.teacher_id })
        .then((modules, error) => {
            requestManagment(
                response,
                modules,
                error,
                "Aucun module n'a été trouvé."
            )
        })
        .catch(error => serverError(error, response));
};