const jwt = require('jsonwebtoken');

//verifie la validite du token, est utilise pour les verification des route student et teachers
exports.verify_token = (req, res, next) => {
  let token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true }, (error, result) => {
      if (error) {
        res.status(403);
        res.json({ message: "Accès refusé" })
      }
      else {
        next();
      }
    })
  }
  else {
    res.status(403);
    res.json({ message: "Accès refusé" })
  }
}

//Verifie la validite du token et s'assure que l'utilisateur est bien un admin
exports.verify_administrator_token = (req, res, next) => {
  let token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true }, (error, token) => {
      if (error || token.role != "admin") {
        res.status(403);
        res.json({ message: "Unauthorized" });
      }
      else {
        next();
      }
    });
  } else {
    res.status(403);
    res.json({ message: "Unauthorized" });
  }
}