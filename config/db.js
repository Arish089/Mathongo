const mongoose = require('mongoose')
require('dotenv').config()

const DBConnect = (url)=>{
    mongoose.connect(url)
}

module.exports = DBConnect