const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// register user
router.post('/register', async (req,res) => {

    const { name, email, password, confirmpassword } = req.body

    // check campos
    if(!name || !email || !password || !confirmpassword){
        return res.status(400).json({
            error: "Por favor preencha os camposs"
        })
    }
    //check if password
    if(password != confirmpassword){
        return res.status(400).json({
            error: "as senhas nao conferem"
        })
    }
    // check if user exit
    const emailExist = await User.findOne({email: email})

    if(emailExist){
        return res.status(400).json({
            error: "email já cadastrado"
        })
    }

    // create password

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name: name,
        email: email,
        password : passwordHash
    })

    try{
        const newUser = await user.save()

        const token = jwt.sign(
            {
                name: newUser.name,
                id: newUser._id
            },
            "nossotoken"
        )
        res.json({error: null, msg: "cadastro feito com sucesso!", token: token, userId: newUser._id})
    }catch(error){
        res.status(400).json({ error })
    }
})

router.post("/login", async(req,res) => {
const email = req.body.email
const password = req.body.password

// check if cadastro exist

const user = await User.findOne({email: email})

if(!user){
    return res.status(401).json({ error: "cadastro nao existe"})
}

// check if password é igual

const checkPassword = await bcrypt.compare(password, user.password)

if(!checkPassword){
    return res.status(401).json({ error: "senha invalida"})
}
const token = jwt.sign(
    {
        name: user.name,
        id: user._id
    },
    "nossotoken"
)
res.json({error: null, msg: "usuario autenticado!", token: token, userId: newUser._id})
})

module.exports = router;