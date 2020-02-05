const ModuleOfSchoolYearSchema = require('../models/moduleOfSchoolYearModel');
const ModuleSchema = require('../models/moduleModel');
const { requestManagment, serverError } = require("../functions/errorManagment");

exports.addModuleToSchoolYear = (request, response) => {
    let new_module_in_year = new ModuleOfSchoolYearSchema(request.body);

    new_module_in_year.save((error, result) => {
        if (!!error) {
            serverError(error, response);
        } else {
            response.status(200);
            response.json(result);
        }
    });
}

exports.removeModuleFromSchoolYear = (request, response) => {
    ModuleOfSchoolYearSchema.findOneAndDelete({ module_id: request.body.module_id, school_year_id: request.body.school_year_id }).then((result) => {
        response.status(200);
        response.json({ message: "Document deleted" });
    }).catch(e => {
        serverError(error, response);
    })
}

exports.getAllModulesInYear = (request, response) => {
    ModuleOfSchoolYearSchema.find({ school_year_id: request.body.school_year_id }).then((result) => {

        var resultIds = result.map(module_in_year => {
            return mongoose.Types.ObjectId(module_in_year.module_id)
        })
        console.log(resultIds);
        ModuleSchema.find({
            '_id': {
                $in: resultIds
            }
        }).then(modules => {
            response.status(200);
            response.json(modules);
        })
    }).catch(e => {
        serverError(error, response);
    })
}