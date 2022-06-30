require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const cors = require('cors')
const app = express()
app.use(express.json())

//database
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@enclave-project.cnfw0.mongodb.net/?retryWrites=true&w=majority`)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

//cors
app.use(cors())

//url
app.use('/api/auth', authRouter)

//port
const PORT = 8000
app.listen(PORT,() => console.log(`Server started ${PORT}`))