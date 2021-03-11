const path = require('path');
const express = require('express');

const orderCon = require('../controllers/orders');

const router = express.Router();


router.get('/',orderCon.get_test);
router.post('/',orderCon.post_test);



module.exports = router;
