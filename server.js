require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')

const app = express()

connectDB()

app.use(express.json())
app.use(cors())
app.use(helmet())

//Rate limit
const limiter =rateLimit({
    windowMs: 15 * 60 * 1000,
    ma:100
})
app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`server running on ${PORT}`))