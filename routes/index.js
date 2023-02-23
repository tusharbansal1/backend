var express = require('express')
const baseRoute = require('./base')
const userRoutes = require('./user')
const postRoutes = require('./post')

const router = express()

router.use('/', baseRoute)
router.use('/user', userRoutes)
router.use('/posts', postRoutes)

module.exports = router