const mongoose = require("mongoose");
const ModuleOfSchoolYearSchema = require("../models/moduleOfSchoolYearModel");
const ModuleSchema = require("../models/moduleModel");
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

exports.addModuleToSchoolYear = new_module => {
    return new Promise((resolve, reject) => {
        console.log(new_module);

        let module_of_school_year = new ModuleOfSchoolYearSchema(new_module);

        module_of_school_year.save((error, result) => {
            if (!!error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

exports.removeModuleFromSchoolYear = (request, response) => {
    ModuleOfSchoolYearSchema.findOneAndDelete({
        module_id: request.body.module_id,
        }).then(result => {
            resolve(true)
        }).catch(e => {
            reject(false);
        });
    })
};

exports.getModulesInYear = (request, response) => {
    ModuleOfSchoolYearSchema.find({
        school_year_id: request.params.school_year_id
    })
        .then((result, error) => {
            if (error || !result) {
                response.status(400);
                console.error(error);
                response.json("Aucun module n'a été trouvé.");
            } else {
                let modules_id = result.map(module_in_year => {
                    return mongoose.Types.ObjectId(module_in_year.module_id);
                });
                console.log(modules_id);
                ModuleSchema.find({
                    _id: {
                        $in: modules_id
                    }
                }).then((modules, error) =>
                    requestManagment(
                        response,
                        modules,
                        error,
                        "Aucun module n'a été trouvé.",
                    )
                );
            }
        })
        .catch(error => {
            serverError(error, response);
        });
};
