const express = require('express')
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const usercontroller = require('../controllers/usercontroller')
const emailController = require('../controllers/emailController')

const router = express.Router();

router.post('/lists', usercontroller.createList);
router.post('/lists/:listId/users', upload.single('file'), usercontroller.uploadUsers)
router.post('/lists/:listId/email', emailController.sendEmailToList);
router.post('/lists/:listId/email/:userId', emailController.unsubscribeUser);

module.exports = router
