const mongoose = require('mongoose');
const Module = require('../models/moduleModel');
// const textApiProvider = require ('../providers/textApiProviders');

// Récupère la liste des modules
exports.getModule = (req,res) => {
    Module.find({}, (error,modules) => {
        if(error){
            res.status(500);
            res.json({message: "Erreur serveur."});
        }
        else{
            res.status(200);
            res.json(modules);
        
        }
    })
}

// Creer un nouveau module
exports.createAModule = (req,res) => {
    let new_module = new Module(req.body);
    try {
        new_module.save((error, module) => {
            if (error){
                res.status(400);
                console.log(error);
                res.send({message : "Erreur : Un module de ce nom existe déjà"});
            }
            else{
                res.status(201);
                res.json(module);
            }
        });
    }
    catch (e){
        res.status(500);
        console.log(e);
        res.json({message : 'Erreur serveur'});
    }
};
