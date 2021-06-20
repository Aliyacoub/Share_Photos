const Likes = require('../models/likes');

const Post = require('../models/post');


//انشاء لايك
exports.create = (
    (req, res, next) => {

        const { postId, userId } = req.body;
       
        Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true, useFindAndModify: false })
            .then(() => { res.sendStatus(200) })
            .catch(e => {

                res.sendStatus(404);
            });
          
            

    })


//حذف لايك
exports.remove = (
    (req, res, next) => {

        const { postId, userId } = req.body;

        try {
            
            Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true, useFindAndModify: false })
         
            .then(() => { res.sendStatus(200)})
                .catch(e => {
                    res.sendStatus(404);
                });
        }
        catch (e) {
            res.sendStatus(404);
        }
    

    })