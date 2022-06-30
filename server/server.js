const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

dotenv.config({path:'config.env'})
const port = process.env.PORT || 3011

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})