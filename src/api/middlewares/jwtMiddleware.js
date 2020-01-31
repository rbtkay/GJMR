const jwt = require('jsonwebtoken');

exports.verify_token = (req, res, next) => {
  // let token = req.headers['authorization'];
  let token = req.headers.authorization;

  if(token){
    jwt.verify(token, process.env.JWT_KEY, (error, result) => {
      if(error){
        // res.sendStatus(403);
        res.status(403);
        res.json({message: "Accès refusé"})
      }
      else{
        next();
      }
    })
  }
  else{
    res.status(403);
    res.json({message: "Accès refusé"})
  }
}