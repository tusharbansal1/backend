const USER = require('../models/user')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv")
const { jwtSign } = require('../utils/jwt')
const handlebars = require("handlebars")
const fs = require("fs")
const mail = require('../utils/mailer')

dotenv.config()

// welcome template for email signup
const WelcomeEmail = async (user) => {
    try {
        const content = fs.readFileSync("public/views/welcomeTemplate.html").toString()
        const template = handlebars.compile(content)
        await mail(
            user.email,
            "Welcome Email",
            template({
                name: user.firstname,
                email: user.email,
                // password: user.password
            })
        )
        console.log("email sent to user",user.email)
    } catch (error) {
        console.log("error in welcomeemail",error);
    }
}

// create a new user
exports.signup = async function (req, res) {
    try {
        console.log('signing up---------->')

        if (!req.body.firstname || !req.body.email || !req.body.phone || !req.body.password) {
            throw { status: 400, message: 'Fields are missing' }
        }
        //creating encrypted password with bcrypt
        let pwd = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))

        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            password: pwd
        }

        const data = await USER.create(user)
        console.log("user created", data)
        WelcomeEmail(user)
        delete user.password
        res.send({ message: "user created", user })


    } catch (error) {
        console.log("error in signup", error)
        res.send(error)
    }
}

//logging the existing user
exports.login = async function (req, res) {

    try {
        console.log("logging in------------>")
        if (!req.body.email || !req.body.password) {
            throw { status: 400, message: 'Fields are missing' }
        }
        //email does not exist
        let user = await USER.findOne({ email: req.body.email }).lean()
        if (!user) {
            throw { message: "User not found" }
        }
        //comparing passwords by bcrpyt
        console.log("bcrypt.compare", await bcrypt.compare(req.body.password, user.password))
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            throw { message: "Password does not match" }
        }
        // generating token on every login
        let token = jwtSign({
            _id: user._id,
            email: user.email
        })

        let data = token
        console.log("user logged in", user.email)
        res.send({ message: "log in success", data })

    } catch (error) {
        console.log("error in login", error)
        res.send(error)
    }

}

//updating user details
exports.update = async (req, res) => {
    try {
        let updateUser = await USER.findOneAndUpdate({ _id: req.user._id },
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
            }, { new: true }).lean()
        console.log({ message: "updated successfully", updateUser })
        delete updateUser.password
        res.send({ message: "updated successfully", updateUser })
    } catch (error) {
        console.log("error in updating", error)
    }
}
 
//removing a user
exports.delete = async (req, res) => {
    try {
        let deleteUser = await USER.findByIdAndDelete({ _id: req.user._id })
        console.log("user deleted", deleteUser.email)
        res.send({ message: "user deleted successfully", deleteUser })

    } catch (error) {
        console.log("error in deleting", error)
    }
}
