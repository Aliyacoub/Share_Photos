const express = require("express");

const router = express.Router();

const likesController = require('../controllers/likesController')


router.post('/', likesController.create);

router.post('/remove', likesController.remove);


module.exports = router;