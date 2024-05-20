const listModel = require("../models/listModel");
const UserModel = require("../models/userModels");
const parseCSV = require("../utils/csvHandler");

exports.createList = async (req, res)=>{
    const {title, customProperties} = req.body;

    try {
        const list = await listModel.create({title, customProperties});
        res.status(201).send(list)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.uploadUsers = async (req, res)=>{
    const {listId} = req.params;
    const file = req.file;
    console.log(req.params);

    if(!file){
        return res.status(400).json({error: 'CSV file is required'});
    }

    try {
        const list = await listModel.findById(listId);
        if(!list){
            return res.status(400).send({error: 'List not found'});
        }

        const {users, errors} = await parseCSV(file, list);
        const addedUsers = [];

        for(const user of users){
            try {
                const newUser = await UserModel.create(user);
                addedUsers.push(newUser)
            } catch (error) {
                errors.push({
                    row: users.indexOf(user) + 2,
                    message: error.message
                })
            }
        }
        res.status(200).json({
            addedCount: addedUsers.length,
            failedCount: errors.length,
            errors,
            currentCount: await UserModel.countDocuments({list: listId})
        })
        console.log({
            addedCount: addedUsers.length,
            failedCount: errors.length,
            errors,
            currentCount: await UserModel.countDocuments({list: listId})});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}