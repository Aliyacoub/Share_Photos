const express = require('express');

const router = express.Router();

const controller = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');



router.post('/', authMiddleware.guest, controller.login);

router.get('/me', authMiddleware.authenticated, controller.me);


module.exports = router;