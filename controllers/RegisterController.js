const jwt = require('jsonwebtoken');

const User = require("../models/user");

const createError = require('http-errors');

const { check, validationResult, equals, checkBody } = require('express-validator');



//عمل تسجيل حساب ليوزر جديد
exports.register = (req, res, next) => {

    if (req.body.confirmPassword != req.body.password) next(createError(405, 'كلمة المرور غير متطابقة'))
else{
    let data = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.create(data)

        .then(user => {
            let token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
            res.json({ token: token, _id: user._id });
        })
        .catch(next);
}
   
};