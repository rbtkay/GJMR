// modules
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// routes
const userRoutes = require("./api/routes/userRoutes");
const moduleRoute = require("./api/routes/moduleRoutes");
const schoolYearRoute = require("./api/routes/schoolYearRoutes");
const noteRoute = require("./api/routes/noteRoutes");
const moduleInSchoolYearRoute = require('./api/routes/modulesInSchoolYearRoutes');
const studentInYear = require('./api/routes/studentsInSchoolYearRoutes')

// constants
const hostname = "0.0.0.0";
const port = 3000;

// BDD connection
mongoose.connect(`mongodb://mongo/${process.env.DB_NAME}`);
// server configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// CORS
server.use((request, response, next) => {
    console.log(request.method)
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    response.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    response.header(
        "Access-Control-Allow-Origin",
        "http://localhost:4200"
    );
    if (request.method === "OPTIONS") {
        console.log("in the options")
    }
    next();
});
// add route to server
userRoutes(server);
schoolYearRoute(server);
moduleRoute(server);
noteRoute(server);
moduleInSchoolYearRoute(server);
studentInYear(server);

// TODO remove : test if server works
// server.get("/", (request, response) => {
//     response.type("html");
//     response.status(200);
//     response.end("<h1>This is the beginning</h1>");
// });

server.listen(port, hostname);
