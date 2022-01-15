const express = require('express');
const authJwt = require("../middlewares/authJwt");
const usersController = require("../controllers/users");

const router = express.Router();

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], usersController.get);
router.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], usersController.getById);
router.post('/', usersController.create);
router.get('/all', usersController.allAccess);
router.get('/user', [authJwt.verifyToken], usersController.userBoard);
router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], usersController.adminBoard);

module.exports = router;