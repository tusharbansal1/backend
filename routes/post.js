let express = require('express')
let controller = require('../controller/post')
const auth = require("../middlewear/auth")

const router = express.Router()

router.post('/create',auth(), controller.createpost)
router.put('/update',auth(), controller.updatepost)
router.delete('/delete',auth(), controller.deletepost)
router.get('/get',auth(),controller.getpost)
router.patch('/like',auth(),controller.likes)
router.post('/create-comment',auth(),controller.comment)

module.exports = router