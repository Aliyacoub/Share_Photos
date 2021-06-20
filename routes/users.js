var express = require('express');


var router = express.Router();


const User = require('../models/user');





router.post('/', (req, res, next) => {

  User.create({

    name: req.body.name,

    email: req.body.email,

    password: req.body.password

  })

    .then(user => {

      res.json(user);

    })

    .catch(err => {

      res.status(422).send(err);

    });

});



router.get('/', (req, res, next) => {

  User.find()//find all users

    .then(users => {

      res.json(users);

    })

    .catch(err => {

      res.status(422).send(err);

    });
});


router.get('/:id', (req, res, next) => {

  User.findById(req.params.id)//find using id

    .then(user => {

      res.json(user);

    })

    .catch(err => {

      res.status(422).send(err);

    });
});



router.get('/:email,password', (req, res, next) => {

  //User.findById(req.params.id)//find using id
  User.findOne({ email: req.body.email, password: req.body.password })//find by email and password

    .then(user => {

      res.json(user);

    })

    .catch(err => {

      res.status(422).send(err);

    });
});


router.put('/:id', (req, res, next) => {//update data of user 
  let data = {
    name: req.body.name,

    email: req.body.email,

    password: req.body.password
  }

  User.findByIdAndUpdate(req.params.id, data)

    .then(updateuser => {

      if (!updateuser) return res.status(404).send()
      res.json(updateuser)
    })
    .catch(err => {

      res.status(422).send(err);

    });
});


router.delete('/:id', (req, res, next) => {//delete user 
  User.findByIdAndRemove(req.params.id)
    .then(deleteuser => {

      if (!deleteuser) return res.status(404).send()
      res.json({ message: "user is deleted" })
    })

    .catch(err => {

      res.status(422).send(err);

    });
});



module.exports = router;
