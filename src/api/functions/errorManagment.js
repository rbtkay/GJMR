exports.serverError = (error, response) => {
    response.status(500);
    console.log(error);
    response.json({
        message: "Erreur serveur"
    });
};

exports.requestManagment = (response, result, error, message, callback) => {
    if (error || !result) {
        response.status(400);
        console.log(error);
        response.json(message);
    } else {
        response.status(200);
        if (callback) {
            callback();
        } else {
            response.json(result);
        }
    }
};
