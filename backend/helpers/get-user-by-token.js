const jwt = require('jsonwebtoken')

const User = require('../models/user')


const getUserByToken = async (token) => {
    if(!token){
        return res.status(401).json({ error: "Acesso negado!"})
    }

    // find user
    const decoded = jwt.verify(token, "nossotoken")
    const userId = decoded.id 
    const user = await User.findOne({_id: userId});

    return user;
}

module.exports = getUserByToken