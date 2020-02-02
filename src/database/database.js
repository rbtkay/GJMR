const mongoose = require("mongoose");
const json_document = require('./database.json')
const bcrypt = require('bcrypt');

const User = require("../api/models/userModel");
const SchoolYearSchema = require("../api/models/schoolYearModel");
const ModuleSchema = require("../api/models/moduleModel");


try {
    mongoose.connect((`mongodb://mongo/${process.env.DB_NAME}`), (e) => {
        console.log("CONNECTED");

        console.log(json_document["users"]);

        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
        const user_correct_password = json_document["users"].map(user => {
            user["password"] = bcrypt.hashSync("password", salt);
            return user;
        })
        console.log(user_correct_password)

        User.collection.insertMany(user_correct_password).then(result => {
            console.log("initial users inserted")
        }).then(result => {
            SchoolYearSchema.collection.insertMany(json_document["schoolyears"]).then(result => {
                console.log("initial schoolyear inserted")
            }).then(result => {
                ModuleSchema.collection.insertMany(json_document["modules"]).then(result => {
                    console.log("initial schoolyear inserted")
                })
            }).then(result => {
                mongoose.disconnect(e => { console.log(e); });
            })
        }).catch(e => { console.log(e); })
    })
}
catch (e) {
    console.log(e)
}


