const IndexHandlers = require('../handlers/index');
const express = require('express');

const router = express.Router();


/* GET home page. */
router.get('/', IndexHandlers.HomePage);
router.get('/filter/:shown', IndexHandlers.HomePage);

module.exports = router;
