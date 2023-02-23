var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: { type: Number, unique: true, required: true },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHERS"],
    },
    password: { type: String }
},
    {
        timestamps: true,
    })

let USER = mongoose.model("User", userSchema)

module.exports = USER