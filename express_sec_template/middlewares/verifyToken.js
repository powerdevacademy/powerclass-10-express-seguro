const jwt = require('jsonwebtoken');
const constants = require('../constants');

const verifyToken = (req, res, next) => {
    if(req.headers["authorization"]) {
        const [bearer, token] = req.headers["authorization"].split(" ");

        const data = jwt.verify(token, constants.SECRET_KEY, (err, data) => {
            if (err) {
                console.log('error', err);
                res.status(403).json({
                    error: `Token inválido - ${err.message}`,
                    message: err.message,
                    errorCode: err.name
                }); 
            } else {
                req.token = { ...data };

                console.log('token', data);
                next();    
            }
        });
    } else {
        res.status(403).json({"error": "Informe o token na requisição"});  
    }
}


module.exports = verifyToken;