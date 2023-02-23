const jwt = require("jsonwebtoken")
const USER = require("../models/user")
const dotenv = require("dotenv")
const { compareSync } = require("bcrypt")

dotenv.config()

module.exports = (strategy = "basic") => {
    return async (req, res, next) => {
        try {
            //if no token is present
            if(!req.headers.authorization){
                throw({message:"Bearer token not present"})
            }
            //if token exists verify the token for user login
            let decode = await jwt.verify(req.headers.authorization.replace("Bearer ",''), process.env.SECRET_KEY)
            req.user=decode.user
            console.log(req.user)
            //wrong token
            if(!await USER.findById({_id:req.user._id},{_id:1})){
                throw({message:"User deleted or not found"})
            }
            else{
                next()
            }

        } catch (error) {
            res.send(error)
        }
    }
}

