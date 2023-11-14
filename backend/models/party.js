const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    partyDate: {
        type: Date
    },
    photo: {
        type: Array
    },
    privacy:{
        type: Boolean
    },
    userId: {
        type: mongoose.ObjectId
    }
})

const Party = mongoose.model('Party', PartySchema)

module.exports = Party