const express = require('express');
const router = express.Router();
const {registerUser,updateUser,getUser,deleteUser} = require('../controllers/users')

// http://localhost:4050/category/categories

router.post('/reg', registerUser)   /* trigger certain function*/
router.post('/:oldusername/update', updateUser)   
router.post('/delete', deleteUser)   
router.get('/get', getUser)   

module.exports = router;