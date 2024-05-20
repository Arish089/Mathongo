const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    properties: {type: Map, of: String},
    list: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    unsubscribed: {type: Boolean, default: false}
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel