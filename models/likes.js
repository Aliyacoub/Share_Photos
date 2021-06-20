const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const LikeSchema = new Schema({
    post: {

        type: Schema.Types.ObjectId,

        ref: 'Post'
    },

    user: {

        type: Schema.Types.ObjectId,

        ref: 'User'
    },

    create_at: {

        type: Date,

        default: Date.now

    },

});


const Likes = mongoose.model('Likes', LikeSchema);

module.exports = Likes;