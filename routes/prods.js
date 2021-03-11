const path = require('path');
const express = require('express');

const prodCon = require('../controllers/prods');

const router = express.Router();


router.get('/',prodCon.get_test);
router.post('/',prodCon.post_test);



module.exports = router;
