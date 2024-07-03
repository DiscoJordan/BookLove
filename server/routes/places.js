const express = require('express');
const router = express.Router();
const {addPlace,deletePlace,updatePlace,getPlace,getAllPlaces,uploadPlacePhotos,addPlacesFromGoogle} = require('../controllers/places')

// http://localhost:4050/category/categories
router.post('/add', addPlace)   /* trigger certain function*/
router.post('/delete', deletePlace)
router.post('/:oldtitle/update', updatePlace)
router.get('/get', getPlace)
router.get('/getall', getAllPlaces)

router.post('/uploadPhotos', uploadPlacePhotos)
router.post('/fetch', addPlacesFromGoogle)


module.exports = router;