let mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    commentmessage: {type : String,require: true },
    postId:{type:Schema.Types.ObjectId, ref:'Posts', require: true},
    owner: {type : Schema.Types.ObjectId, ref:'User',require: true }

},
    {
        timestamps: true,
    })

const COMMENTS = mongoose.model('Comments', commentsSchema)
module.exports = COMMENTS