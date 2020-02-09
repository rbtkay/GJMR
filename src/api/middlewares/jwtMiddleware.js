const jwt = require('jsonwebtoken');

//verifie la validite du token, est utilise pour les verification des route student et teachers
exports.verifyToken = (request, response, next) => {
  let token = request.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true }, (error, responseult) => {
      if (error) {
        response.status(403);
        response.json({ message: "Accès refusé" })
      }
      else {
        next();
      }
    })
  }
  else {
    response.status(403);
    response.json({ message: "Accès refusé" })
  }
}

//Verifie la validite du token et s'assure que l'utilisateur est bien un admin
exports.verifyAdminToken = (request, response, next) => {
  let token = request.headers['authorization'];

  console.log(token);

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true }, (error, token) => {
      if (error || token.role != "admin") {
        response.status(403);
        response.json({ message: "Unauthorized" });
      }
      else {
        next();
      }
    });
  } else {
    response.status(403);
    response.json({ message: "Unauthorized" });
  }
}

//
/** Verifie la validite du token et s'assure que l'utilisateur est bien un etudiant 
 *  cette fonction est pas utilise encore 
 */
exports.verifyStudentToken = (request, response, next) => {
  let token = request.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true }, (error, token) => {
      if (error || token.role != "student") {
        response.status(403);
        response.json({ message: "Unauthorized" });
      }
      else {
        next();
      }
    });
  } else {
    response.status(403);
    response.json({ message: "Unauthorized" });
  }
}