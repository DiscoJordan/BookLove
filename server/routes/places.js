const express = require('express');
const router = express.Router();
const {displayDataOfPlaces} = require('../controllers/places')

// http://localhost:4050/category/categories
router.get('/places', displayDataOfPlaces)   /* trigger certain function*/



module.exports = router;