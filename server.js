var express = require('express')
const { connectDB } = require('./utils/database')
const route = require('./routes/index')
const dotenv = require("dotenv")

dotenv.config()

connectDB()
var app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', route)

app.listen(port, function () {
    console.log(`server is running at ${port}`)
})
