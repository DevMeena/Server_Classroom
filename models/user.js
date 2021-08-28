import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    pwd: String
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;