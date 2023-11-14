const jwt = require('jsonwebtoken')

// middleware to validate token 

const checkToken = (req,res,next) => {
    
    const token = req.header("auth-token");

    if(!token){
        return res.status(401).json({ error: " acesso negado! "})
    }

    try {
        const verifired = jwt.verify(token, "nossotoken");
        req.user = verifired;
        next(); // continua
    } catch (error) {
        res.status(400).json({ error: "token invalido"})
    }
}

module.exports = checkToken