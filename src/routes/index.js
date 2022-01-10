const express = require('express');
//import usersRoute from './users';

const router = express.Router();

//router.use('/users', usersRoute);
router.get('/', (req, res) => res.send("Hello world by route!!!!"));

module.exports = router;