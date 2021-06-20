const createError = require('http-errors');

const jwt = require('jsonwebtoken');

const User = require('../models/user');




//دخول اليوزر

exports.login = (req, res, next) => {
    if (req.body.email === '' && req.body.password === '') next(createError(403, ' الرجاء قم بإدخال البريدي الإلكتروني و كلمة المرور .'))
    if (req.body.password === '') next(createError(403, ' الرجاء قم بإدخال كلمة المرور .'))

    User.findOne({ email: req.body.email, password: req.body.password })

        .then(user => {

            if (!user) next(createError(401, 'البريد الإلكتروني أو كلمة مرور غير صحيحة.'));

            let data = {
                id: user._id,
                name: user.name,
                email: user.email
            };
            let token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ token: token, _id: user._id });
        })
        .catch(next);
};


//تفاصيل اليوزر

exports.me = (req, res, next) => {
    res.json(req.user);
};