// modelos
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// rotas
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const partyRouter = require('./routes/partyRoutes')


// config

const dbName = 'partytimeb'
const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

// router
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/party', partyRouter)

// conectar banco

mongoose.connect(
    `mongodb://0.0.0.0:27017/${dbName}`
);

app.get('/', (req,res) =>{
    res.json({ message: "rota ok!"})
})

app.listen(port, () => {
    console.log(`o back esta roda n aporta ${port}`)
})