let mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    description: { type: String },
    image: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],

},
    {
        timestamps: true,
    })

const POSTS = mongoose.model('Posts', postSchema)
module.exports = POSTS