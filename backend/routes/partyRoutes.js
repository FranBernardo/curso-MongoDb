const router = require('express').Router()
const bcrypt = require('bcrypt')
const multer = require('multer')
const jwt = require('jsonwebtoken')

const Party = require('../models/party')
const User = require('../models/user')

const diskStorage = require("../helpers/file-storage")
const upload = multer({ storage: diskStorage })

const verifyToken = require("../helpers/check-token")

const getUserByToken = require('../helpers/get-user-by-token')


router.post("/", verifyToken, upload.fields([{ name : " photo "}]), async (req,res) => {
    
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.party_date

    let files = []

    if(req.files){
        files = req.files.photos 
    }

    if(!title || !description || !partyDate){
       return res.status(400).json({ msg: "campos obrigatorios"})
    }

    const token = req.header("auth-token");
    const getUserByToken = await getUserByToken(token);
    const userId = getUserByToken._id.toString();

    try {
        const user = await User.findOne({ _id: userId})
        
        let photos = []

        if(files && files.length > 0){
            files.forEach((photo, i) => {
                photos[i] = photo.path
            });
        }

        const party = new Party({
            title: title,
            description: description,
            partyDate: partyDate,
            photos: photos,
            privacy: req.body.privacy,
            userId: user._id.toString()
        })

        try {
            const newParty = await party.save();
            res.json({ error: null, msg: "evento criado com sucesso!", data: newParty })
        } catch (error) {
            return res.status(400).json({error})
        }
    } catch (error) {
        return res.status(400).json({ msg: "Acesso negado!"})
    }

});

router.get('/all', async (req, res) => {
    try {
        const parties = await Party.find({ privacy: false}).sort([[ '_id', -1 ]])
        res.json({error: null, parties: parties})
    } catch (error) {
        return res.status(400).json({error })
    }
})

module.exports = router
