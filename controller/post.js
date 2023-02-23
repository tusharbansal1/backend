const POSTS = require("../models/posts");
const USER = require("../models/user");
const { Types } = require("mongoose");
const COMMENTS = require("../models/comments");
const ObjectId = Types.ObjectId;

//creating a new post
exports.createpost = async (req, res) => {
    try {
        console.log("posting--------->")
        if (!req.body.title || !req.body.description) {
            throw ({ message: "Fields are missing" })
        }
        let post = {
            title: req.body.title,
            description: req.body.description,
            owner: req.user._id
        }
        const data = await POSTS.create(post)
        console.log("post created", data)
        res.send({ message: "post created successfully", data })
    } catch (error) {
        console.log("error in posting", error)
    }
}

//updating a post
exports.updatepost = async (req, res) => {
    try {
        let updatepost = await POSTS.findByIdAndUpdate({ _id: req.body._id }, {
            title: req.body.title,
            description: req.body.description
        }, { new: true }).lean()

        console.log({ message: "updated successfully", updatepost })

        res.send({ message: "updated successfully", updatepost })

    } catch (error) {
        console.log("error in updating post", error)
    }
}

//deleting a post
exports.deletepost = async (req, res) => {
    try {
        let deletepost = await POSTS.findByIdAndDelete({ _id: req.body._id })
        console.log("post deleted", deletepost.title)
        res.send({ message: "post deleted successfully", deletepost })
    } catch (error) {
        console.log("error in deleting post", error)
    }
}

// getting posts
exports.getpost = async (req, res) => {
    try {
        if ((req.query.message !== '') && (req.query.message !== 'all')) {
            throw ({ message: "enter the correct message for post" })
        }
        let query = {}
        // the posts for current users will be shown
        if (req.query.message === '') {
            query = { owner: req.user._id }
        }
        let selectedpost = await POSTS.find(query).populate("owner", ["email"]).lean()
        console.log("selected post", selectedpost)
        res.send({ message: 'selected posts', selectedpost })

    } catch (error) {
        console.log("error in retreiving posts------->", error)
        res.send(error)
    }
}

//liking a post
exports.likes = async (req, res) => {
    try {
        let post = await POSTS.findById({ _id: req.body._id })
        let query = {}
        let message = ""
        //unlike  post based on post and user id
        if (post.likes.includes(req.user._id)) {
            query = { $pull: { likes: req.user._id } }
            message = "post unliked"
            console.log('post unliked------>', post.title)
        }
        else {
            //like the post 
            query = { $addToSet: { likes: req.user._id } }
            message = "post liked"
            console.log('post liked------>', post.title)
        }

        let likepost = await POSTS.findByIdAndUpdate({ _id: req.body._id }, query, { new: true })

        res.send(message)

    }
    catch (error) {
        console.log("error in liking post", error)
    }

}

exports.comment = async (req, res) => {
    try {
        if (!req.body.commentmessage || !req.body._id) {
            throw ({ message: "fields are missing" })
        }
        let comment = {
            commentmessage: req.body.commentmessage,
            postId: req.body._id,
            owner: req.user._id
        }
        let data = await COMMENTS.create(comment)

        await POSTS.findByIdAndUpdate({ _id: req.body._id },
            { $addToSet: { comments: data._id }},
            { new: true })
            
    console.log("comment added------>", comment.commentmessage)
    res.send({ message: "comment added" })
} catch (error) {
    console.log("error in commenting------->", error)
    res.send(error)
}
}