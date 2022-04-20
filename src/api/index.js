const express = require('express');

const {Router} = express;
const router = new Router();

const destination = require('./destination');

router.use('/api/', destination);

module.exports = router;
