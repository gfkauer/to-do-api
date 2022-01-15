const express = require('express');
const verifySignUp = require("../middlewares/verifySignUp");
const auth = require("../controllers/auth");

const router = express.Router();

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], auth.signup);
router.post('/signin', auth.signin)

module.exports = router;