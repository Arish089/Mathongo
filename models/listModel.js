const mongoose = require('mongoose')


const customPropertySchema = new mongoose.Schema({
    title:{type: String, required: true},
    defaultValue:{type: String, required: true}
})

const listSchema = new mongoose.Schema({
title:{type: String, required: true},
customProperties: [customPropertySchema]
})

const listModel = mongoose.model('List', listSchema)

module.exports = listModel