const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String, 
    content: String, 
    //Cover is for the path of images and files
    cover: String,
    //Getting the OuterID or the userid so that we can call it if whoever posted the blog post and the 'User' is the reference for the object usersid
    author:{type:Schema.Types.ObjectId, ref:'User'},
},
{
    timestamps: true,
}
);
const PostModel = model('Post', PostSchema);

module.exports = PostModel;
