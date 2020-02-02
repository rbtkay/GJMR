const mongoose = require('mongoose');
const Module = require('../models/moduleModel');
// const textApiProvider = require ('../providers/textApiProviders');

// Récupère la liste des modules
exports.getModule = (req, res) => {
    Module.find({}, (error, modules) => {
        if (error) {
            res.status(500);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(modules);

        }
    })
}

//recup 

exports.getModulesByTeacher = (request, response) => {
    Module.find({}).then((modules, error) =>
        requestManagment(
            response,
            results,
            error,
            "Aucun module n'a été trouvé."
        )
    ).catch(error => serverError(error, response));

}


// Creer un nouveau module
exports.createAModule = (req, res) => {
    let new_module = new Module(req.body);
    try {
        new_module.save((error, module) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.send({
                    message: "Erreur : Un module de ce nom existe déjà"
                });
            } else {
                res.status(201);
                res.json(module);
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({
            message: 'Erreur serveur'
        });
    }

}

// récupérer un module par son id
exports.get_a_module = (req, res) => {
    try {
        Module.findById(req.params.module_id, (error, module) => {
            if (error) {
                res.status(400);
                res.json({
                    message: 'Id introuvable'
                });
            } else {
                res.status(200);
                res.json(module);
            }
        })
    } catch (e) {
        res.status(500);
        res.json({
            message: 'Erreur serveur'
        });
    }
}


// mettre à jour un module
exports.update_a_module = (req, res) => {
    try {
        // {new:true} est un  objet qui permet d'envoyer directement la nouvelle version dans la response sinon il va garder l'ancienne version dans la response.
        // Cependant il va bien faire la modification

        Module.findByIdAndUpdate(req.params.module_id, req.body, {
            new: true
        }, (error, module) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({
                    message: 'ID introuvable'
                });
            } else {
                res.status(200);
                res.json(module);
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json("Erreur du serveur");
    }

};

// supprimer un module

exports.delete_a_module = (req, res) => {
    try {
        Module.findByIdAndDelete(req.params.module_id, (error, module) => {
            if (error) {
                res.status(400);
                res.json({
                    message: 'Id introuvable'
                });
                console.log(error);
            } else {
                res.status(201);
                res.json('Module supprimé');
            }
        })
    } catch (e) {
        res.status(500);
        res.json({
            message: 'Erreur serveur'
        });
        console.log(e);
    }
};