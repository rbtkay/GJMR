// schema
const Module = require("../models/moduleModel");
const ModuleOfSchoolYear = require("../models/moduleOfSchoolYearModel");
// fucntions
const {
    requestManagment,
    requestManagmentPromise,
    serverError
} = require("../functions/errorManagment");

exports.getModuleById = (module_id, response) => {
    Module.find({ module_id })
        .then((module, error) =>
            requestManagment(response, module, error, "Module introuvable.")
        )
        .catch(error => serverError(error, response));
};

exports.getModulesById = (modules_id, response) => {
    Module.find({
        module_id: {
            $in: modules_id
        }
    })
        .then((module, error) =>
            requestManagment(response, module, error, "Aucun module trouvé.")
        )
        .catch(error => serverError(error, response));
};

exports.getModulesIdFromSchoolYear = (school_year_id, response) => {
    ModuleOfSchoolYear.find({ school_year_id })
        .then((modules, error) =>
            requestManagmentPromise(
                response,
                modules,
                error,
                "Aucun module trouvé."
            ).then(() => JSON.parse(modules).map(module => module.module_id))
        )
        .catch(error => serverError(error, response));
};
