const mongoose = require("mongoose");
const Module_of_school_year = require("../models/moduleOfSchoolYearModel");
// fucntions
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

exports.getModulesOfSchoolYear = (request, response) => {
    Module_of_school_year.find(request.body)
        .then((error, module_sy) => {
            if(error) {
                response.status(400);
                console.log(error);
                response.json({message :'Module of school year not found'});
            }
            else {
                response.status(200);
                response.json(module_sy);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({
                message: "Erreur serveur"
            });
        });
};


exports.createModulesOfSchoolYear = (request, response) => {
    new Module_of_school_year(request.body)
        .save()
        .then((error, module_sy) => {
            if(error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Il manque des informations"
                });
            } else {
                response.status(201);
                response.json(module_sy);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({message :'Erreur serveur'});
        })

   
};


/**
 * Delete a module of school year with :
 *  modukl_id (int)
 * school_year_id (string)
 */
exports.deleteModuleOfSchoolYear= (request, response) => {
    Module_of_school_year.findByIdAndRemove(request.params.module_id)
        .then(error => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Module de l'année introuvable"
                });
            } else {
                response.status(200);
                response.json({
                    message: "Module de l'année supprimée"
                });
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({
                message: "Erreur serveur"
            });
        });
};
