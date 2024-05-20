const UserModel = require("../models/userModels");
const sendEmail = require("../utils/emailhandle");


exports.sendEmailToList = async(req, res)=>{
    const { listId } = req.params;
    const { subject, body } = req.body;

    try {
        const users = await UserModel.find({ list: listId, unsubscribed: false });
        const emailPromises = users.map((user) =>{
            console.log(user.properties)
            sendEmail(user.email, subject, body, user)
    });
    await Promise.all(emailPromises);
    res.status(200).json({message: "Emails sent successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

exports.unsubscribeUser = async (req, res)=>{
    const {userId} = req.params;

    try {
        const user = await UserModel.findByIdAndUpdate(userId, {unsubscribed: true});
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json({message: "User unsubscribed successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}