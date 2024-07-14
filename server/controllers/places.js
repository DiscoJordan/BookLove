const Places = require("../models/places");
const Users = require("../models/users");
const cloudinary = require("cloudinary");
// remember to add your credentials to .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const addComment = async (req, res) => {
 
  try {
    const { placeId, comment, date, userId } = req.body;
    const foundPlace = await Places.findById(placeId);
    if (foundPlace) {
      foundPlace["comments"].unshift({
        userId: userId,
        comment: comment,
        date: date,
      });
      await foundPlace.save();
    }
    res.send({
      ok: true,
      data: `Place '${foundPlace.title}' was commented`,
      foundPlace,
      userId,
    });
  } catch (error) {
    res.send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const deleteComment = async (req, res) => {
 
  try {
    const { comment, userId, placeId } = req.body;
    const foundPlace = await Places.findOne({_id:placeId});

    console.log(foundPlace.comments);
    console.log(comment._id);
    if (foundPlace.comments.some(com=> com._id.equals(comment._id))) {
      console.log(`r4r`);
      foundPlace.comments=foundPlace.comments.filter(com=>!com._id.equals(comment._id))
      await foundPlace.save()
      
    }

    res.send({
      ok: true,
      data: `Comment '${comment.comment}' was deleted`,
      foundPlace,
    });
  } catch (error) {
    res.send({ ok: false, data: error.message });
    console.log(error.message);
  }
};


const addPlacesFromGoogle = async (req, res) => {
  try {
    const googlePlaces = req.body;
    let places = googlePlaces.map((place) => {
      return {
        title: place?.title,
        coordinates: place?.location || {},
        subtitle: place?.subtitle || "",
        description: {
          header: "",
          descriptionText: place?.description || "",
        },
        tags: place?.tags || [],
        location: place?.adress,
        price: 0,
        website: place?.website,
        hours: place?.hours,
      };
    });

    for (let place of places) {
      const exist = await Places.findOne({ title: place.title });
      if (!exist) {
        await Places.create(place);
      }
    }

    res.send({ ok: true, data: `Places was created` });
  } catch (error) {
    res.send({ ok: false, data: error.message });
  }
};

const removePicture = async (req, res) => {
  const { public_id } = req.body;
  try {
    let deletePic = await cloudinary.uploader.destroy(public_id);
    
    if (deletePic.result) {
      res.status(200).json("Success");
    } else {
      res.status(400).json("Something goes wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const uploadPlacePhotos = async (req, res) => {
  const { files, id } = req.body;
  let pictures = files.map((pic) => {
    return {
      public_id: pic.uploadInfo?.public_id,
      photo_url: pic.uploadInfo?.secure_url,
    };
  });
  if (id) {
    try {
      const foundPlace = await Places.findOne({ _id: id });
      foundPlace.photos.push(...pictures);
      await foundPlace.save();
      res.json({ ok: true, result: foundPlace.photos });
    } catch (error) {
      res.json({ ok: false });
    }
  }
};

const addPlace = async (req, res) => {
  try {
    const {
      cover,
      title,
      subtitle,
      description,
      tags,
      location,
      hours,
      price,
      photos,
    } = req.body;
    await Places.create({
      cover: cover,
      title: title,
      subtitle: subtitle || "",
      description: description || {},
      tags: tags || [],
      location: location,
      hours: hours,
      price: price,
      photos: photos || [],
    });
    res.send({ ok: true, data: `Place '${title}' was created` });
  } catch (error) {
    res.send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const deletePlace = async (req, res) => {
  try {
    const { title } = req.body;
    const placeExist = await Places.findOne({ title: title });
    if (placeExist) {
      await placeExist.deleteOne();
      res.send({ ok: true, data: `Place '${title}' was deleted` });
    } else {
      res.send({ ok: true, data: `Place '${title}' was not found` });
    }
  } catch (error) {
    res.send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const updatePlace = async (req, res) => {
  try {
    const { oldtitle } = req.params;
    const uniqePlace = await Places.findOne({ title: oldtitle });

    if (uniqePlace) {
      const result = await Places.findOneAndUpdate(
        { title: oldtitle },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).send({
        ok: true,
        data: `Place '${req.body.title}' was updated`,
        result: result,
      });
    } else {
      res.status(200).send({
        ok: true,
        data: `Title '${req.body.title}' is already taken `,
      });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const getPlace = async (req, res) => {
  try {
  
    const { placetitle } = req.params;
    const uniqePlace = await Places.findOne({ title: placetitle }).populate("comments.userId")

    if (uniqePlace) {
      res.status(200).send({ ok: true, data: uniqePlace });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Place was not found` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};
const getAllPlaces = async (req, res) => {
  try {
    let places = await Places.find({}).populate("comments.userId");
    places = JSON.parse(JSON.stringify(places));
    if (places) {
      res.status(200).send({ ok: true, data: places });
    } else {
      res.status(200).send({ ok: true, data: `Places was not found ` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

module.exports = {
  addPlace,
  deletePlace,
  updatePlace,
  getPlace,
  getAllPlaces,
  uploadPlacePhotos,
  addPlacesFromGoogle,
  removePicture,
  addComment,
  deleteComment,
};
