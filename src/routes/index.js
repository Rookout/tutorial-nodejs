const IndexHandlers = require('../handlers/index');
const express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', IndexHandlers.Home);
router.get('/filter/:shown', IndexHandlers.Home);

module.exports = router;