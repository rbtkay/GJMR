const mongoose = require("mongoose");
const json_document = require('./database.json')
const bcrypt = require('bcrypt');

const User = require("../api/models/userModel");
const SchoolYearSchema = require("../api/models/schoolYearModel");
const ModuleSchema = require("../api/models/moduleModel");
const SchoolYearOfStudentSchema = require("../api/models/schoolYearOfStudentModel");
const ModuleOfSchoolYear = require("../api/models/moduleOfSchoolYearModel");

try {
    mongoose.connect((`mongodb://mongo/${process.env.DB_NAME}`), e => {
        console.log("CONNECTED");
        let students;
        let teachers;
        let schoolyear;
        let students_in_year;
        let modules_in_year;

        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        const user_correct_password = json_document["users"].map(user => {
            user["password"] = bcrypt.hashSync("password", salt);
            return user;
        });

        User.collection.insertMany(user_correct_password).then(result => {
            students = result["ops"].filter(user => user.role == "student");
            teachers = result["ops"].filter(user => user.role == "teacher");

            SchoolYearSchema.collection.insertMany(json_document["schoolyears"]).then(result => {
                schoolyear = result["ops"].filter(schoolyear => schoolyear.name == "ESIS-aw");
                students_in_year = students.map(student => ({
                    "student_id": student._id.toString(),
                    "school_year_id": schoolyear[0]["_id"].toString()
                }));

                SchoolYearOfStudentSchema.collection.insertMany(students_in_year).then(result => {

                    ModuleSchema.collection.insertMany(json_document["modules"]).then(result => {
                        console.log("initial modules inserted");

                        ModuleSchema.collection.updateMany(
                            {}, 
                            { $set: { "teacher_id": teachers[Math.round(Math.random())]._id } }
                        );

                        modules_in_year = result["ops"].map((item, i) => ({
                            "module_id": item._id.toString(),
                            "school_year_id": schoolyear[0]["_id"].toString(),
                        }));

                        ModuleOfSchoolYear.collection.insertMany(modules_in_year).then(result => {
                            console.log("module inserted in year");

                            mongoose.disconnect(e => {
                                console.log("connection closed");
                                console.log(e);
                            });
                        });
                    });
                });
            });
        }).catch(e => {
            console.log("ERROR!!!!!")
            console.log(e);
        })
    })
}
catch (e) {
    console.log(e)
}

// container_mongo | 2020-02-04T19:58:57.246+0000 I  SHARDING [conn1] Marking collection db_feedback_ipssi.schoolyearofstudents as collection version: <unsharded>
// container_mongo | 2020-02-04T19:58:57.246+0000 I  STORAGE  [conn1] createCollection: db_feedback_ipssi.schoolyearofstudents with generated UUID: 0b0bcbab-ebd1-465a-a75b-d2675660c047 and options: {}
// container_mongo | 2020-02-04T19:58:57.644+0000 I  INDEX    [conn1] index build: done building index _id_ on ns db_feedback_ipssi.schoolyearofstudents
// container_mongo | 2020-02-04T19:58:57.645+0000 I  COMMAND  [conn1] command db_feedback_ipssi.schoolyearofstudents command: insert