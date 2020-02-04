const mongoose = require("mongoose");
const Module = require("../models/moduleModel");
const ModuleOfSchoolYear = require("../models/moduleOfSchoolYearModel");
// fucntions
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

exports.getModules = (request, response) => {
    Module.find(
        request.body
            ? {
                  module_id: {
                      $in: request.body.module_id
                  }
              }
            : {}
    )
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

//Recuperer les modules d'un intervenant
exports.getModulesByTeacher = (request, response) => {
    Module.find({})
        .then((modules, error) =>
            requestManagment(
                response,
                results,
                error,
                "Aucun module n'a été trouvé."
            )
        )
        .catch(error => serverError(error, response));
};

exports.createModule = (request, response) => {
    let new_module = new Module(request.body);
   
    new_module.save()
        .then((module, error) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.send({
                    message: "Erreur : Un module de ce nom existe déjà"
                });
            } else {
                response.status(201);
                response.json(module);
            }
        })
        .catch(error => serverError(error, response));

};

// mettre à jour un module
exports.updateModule = (request, response) => {


    Module.findByIdAndUpdate(request.params.module_id, request.body, { new: true })
        .then((module , error) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({ message: "ID introuvable" });
            } else {
                response.status(200);
                response.json(module);
            }
        })
        .catch(error => serverError(error, response));



};

// supprimer un module
exports.deleteModule = (request, response) => {

    Module.findByIdAndDelete(request.params.module_id)
        .then((module, error) => {
            if (error) {
                response.status(400);
                response.json({ message: "Id introuvable" });
                console.log(error);
            } else {
                response.status(200);
                response.json(module);
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
