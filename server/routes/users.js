const express = require('express');
const router = express.Router();
const {displayData} = require('../controllers/users')

// http://localhost:4050/category/categories
router.get('/users', displayData)   /* trigger certain function*/



module.exports = router;