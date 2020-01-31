const mongoose = require('mongoose');
const Module = require('../models/moduleModel');
// const textApiProvider = require ('../providers/textApiProviders');


exports.get_modules = (req,res) => {
    Module.find({}, (error,modules) => {
        if(error){
            res.status(500);
            // console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else{
            res.status(200);
            res.json(modules);
        
        }
    })
}
