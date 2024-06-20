const express = require('express');
const router = express.Router();
const {addPlace,deletePlace} = require('../controllers/places')

// http://localhost:4050/category/categories
router.post('/add', addPlace)   /* trigger certain function*/
router.post('/delete', deletePlace)



module.exports = router;