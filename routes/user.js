var express=require('express')
var controller = require('../controller/user')
const auth = require("../middlewear/auth")

const router = express.Router()

router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.put('/update',auth(),controller.update)
router.delete('/delete',auth(),controller.delete)


module.exports=router