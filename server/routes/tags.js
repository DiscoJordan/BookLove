const express = require('express');
const router = express.Router();
const {getAllTags,
    getTag,
    addTag} = require('../controllers/tags')

// http://localhost:4050/tag/....
router.post('/add', addTag)   /* trigger certain function*/
router.get('/get', getTag)
router.get('/getall', getAllTags)



module.exports = router;