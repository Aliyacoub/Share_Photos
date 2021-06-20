const express = require("express");

const router = express.Router();

const controller = require("../controllers/postController");

const authMiddleware = require('../middlewares/authMiddleware');



router.post('/', authMiddleware.authenticated, controller.create);

router.get('/', controller.list);

router.get('/:id', controller.details);

router.put('/:id', authMiddleware.authenticated, controller.updates);

router.delete('/:id', authMiddleware.authenticated, controller.deletes);



module.exports = router;