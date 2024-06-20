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
      description: description || [],
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
    const placeExist = await Places.findOne({ title: title });
    if (placeExist) {
      await placeExist.deleteOne();
      res.send({ ok: true, data: `Place '${title}' was deleted` });
    } else {
      res.send({ ok: true, data: `Place '${title}' was  not found` });
    }
  } catch (error) {
    res.send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

module.exports = {
  addPlace,
  deletePlace,
};
