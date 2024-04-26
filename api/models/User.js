const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    description: String,
})

const UserModel = model("User", UserSchema);

module.exports = UserModel;