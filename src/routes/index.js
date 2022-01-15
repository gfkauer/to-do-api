const express = require('express');
const authRoute = require("./auth");
const usersRoute = require("./users");

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', usersRoute);
router.get('/', (req, res) => res.send("Hello world by route!!!!"));

module.exports = router;