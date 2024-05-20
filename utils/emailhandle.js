const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (to, subject, body, user) => {
    console.log('Request body:', to, subject, body, user); 
    console.log('Sending email using:', process.env.EMAIL);

    const personalizedBody = await body.replace(/\[([^\]]+)]/g, (_, key) => {
        const value = user[key] ? user[key] :user.properties?.get(key);
        console.log(`Replacing [${key}] with ${value || ''}`); // Debug: Log replacement
        return value || '';
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html: personalizedBody + `<br><a href="http://localhost:7700/api/lists/${user.list}/email/${user._id}">Unsubscribe</a>`
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log(`Email sent to ${to}: ${info.response}`);
            return info;
        })
        .catch(error => {
            console.error(`Error sending email to ${to}:`, error);
            throw error;
        });
};

module.exports = sendEmail;
