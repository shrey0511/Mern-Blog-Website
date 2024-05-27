const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,//path to a file inside uploads
    author:{type:Schema.Types.ObjectId, ref:'User'},
},{
    timestamps:true,//Extra columns to know when post has been created
});

const PostModel = model('Post',PostSchema);

module.exports = PostModel;