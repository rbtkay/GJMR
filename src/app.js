// modules
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// routes
const userRoutes = require("./api/routes/userRoutes");
// const adminRoutes = require("./api/routes/adminRoutes");
const studentRoute = require("./api/routes/studentRoutes");
const moduleRoute = require("./api/routes/moduleRoutes");
const schoolYearRoute = require("./api/routes/schoolYearRoutes");

// constants
const hostname = "0.0.0.0";
const port = 3000;

// BDD connection
mongoose.connect(`mongodb://mongo/${process.env.DB_NAME}`);
// server configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// add route to server
userRoutes(server);
// adminRoutes(server);
schoolYearRoute(server);
studentRoute(server);
moduleRoute(server);

// TODO remove : test if server works
// server.get("/", (request, response) => {
//     response.type("html");
//     response.status(200);
//     response.end("<h1>This is the beginning</h1>");
// });

server.listen(port, hostname);
