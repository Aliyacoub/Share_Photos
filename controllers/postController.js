const Post = require('../models/post');

const createError = require('http-errors');

var fs = require('fs');

var path = require('path');

var multer = require('multer');

const images = multer({ dest: "./images/" });

const mainImagePath = path.join(process.cwd(), 'images');




// انشاء الصورة
exports.create = (
  (req, res, next) => {

    var photo = req.files;
    var profileImg = photo.profileImg;
    var imageName = profileImg.name;
    var imagePath = path.join(process.cwd(), './images/', req.user.id, profileImg.name)
    let model = new Post({
      title: req.body.title,
      content: req.body.content,
      profileImg: imageName,
      author: req.user.id,
      likes: []
    });

   

    if (profileImg.mimetype === 'image/jpeg' || profileImg.mimetype === 'image/png') {
      if (!fs.existsSync(imagePath)) {
        saveImage(req.user.id, profileImg)
        model.save()
          .then((post) => {
            res.json(post);
          })
          .catch(next)

      }
      else {
        next(createError(401, 'الصورة موجودة بالفعل قم باختيار صورة اخرى !'));
      }
    }
    else {
      next(createError(401, 'يسمح فقط بإضافة صور ذات امتداد.png و .jpeg!'));
    }

  });


//تاكد اذا ملف اليوزر موجود او لا 
const getFolderPath = (userId) => {

  const useridpath = path.join(mainImagePath, userId);
  if (!fs.existsSync(useridpath)) {
    fs.mkdirSync(useridpath)

  }

  return useridpath;
}


//تخزين الصوره
const saveImage = (userId, image) => {
  const Imagepath = getFolderPath(userId);

  fs.writeFileSync(path.join(Imagepath, image.name), image.data)

}


//استرجاع الصور التابعة للمستخدم
exports.list = (req, res, next) => {

  Post.find()
  .sort({ created_at: 'desc' })
  .populate('author', 'name')
  .then(posts => {
      res.json(posts);
  })
  .catch(next);

};


//عرض تفاصيل الصوره من خلال ال id

exports.details = (req, res, next) => {
  let postId = req.params.id;
  Post.findById(postId)
    .populate('author', 'name')
    .then((post) => {
      if (!post) throw createError(404);
      res.json(post);
    })
    .catch(next);
};


//تعديل ع الصوره
exports.updates = (req, res, next) => {
  let postId = req.params.id;

  let data = {
    title: req.body.title,

    content: req.body.content,
  };
  Post.findOneAndUpdate({ _id: postId, author: req.user.id }, data, {
    runValidators: true,
  })

    .then((post) => {
      if (!post) throw createError(404);
      res.json();
    })
    .catch(next);
};


//حذف الصوره من الداتابيز والملف

exports.deletes = (req, res, next) => {
  let postId = req.params.id;
  var imageName = "";
  Post.findById(postId)
    .select('profileImg')
    .exec()
    .then(docs => {
      imageName = docs.profileImg;
      fs.unlinkSync(path.join(process.cwd(), './images/', req.user.id, imageName));

    })

  Post.findOneAndDelete({ _id: postId, author: req.user.id })

    .then((post) => {
      if (!post) throw createError(404);
      res.json();
    })
    .catch(next);
};