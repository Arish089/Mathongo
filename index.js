const express = require('express')
const mongoose = require('mongoose')
const DBConnect = require('./config/db')
const router = require('./routes/routes')
const cors = require('cors')
const app = express()
require('dotenv').config()

const port = process.env.port
const url = process.env.DB_URL

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(port, (req, res)=>{
    DBConnect(url)
    console.log("Server is running",port);
})