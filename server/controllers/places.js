const Places = require("../models/places");
const Users = require("../models/users");

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
      tags: tags,
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
    console.log( req.body);
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

    if (!uniqePlace) {
      const result = await Users.findOneAndUpdate(
        { username: oldusername },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).send({
        ok: true,
        msg: `User '${username}' was updated`,
        result:result
      });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Username '${username}' is already taken ` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const getPlace = async (req, res) => {
    try {
      const { title } = req.body;
      const uniqePlace = await Places.findOne({ title: title });
  
      if (uniqePlace) {
        res.status(200).send({ ok: true, data: uniqePlace });
      } else {
        res
          .status(200)
          .send({ ok: true, data: `Place '${title}' was not found ` });
      }
    } catch (error) {
      res.status(400).send({ ok: false, data: error.message });
      console.log(error.message);
    }
  };
  const getAllPlaces = async (req, res) => {
    try {

        let places = await Places.find({})
        places = JSON.parse(JSON.stringify(places))
      if (places) {
        res.status(200).send({ ok: true, data: places });
      } else {
        res
          .status(200)
          .send({ ok: true, data: `Places was not found ` });
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

};
