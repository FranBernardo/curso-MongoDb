const mongoose = require('mongoose')

const UseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UseSchema)

module.exports = User