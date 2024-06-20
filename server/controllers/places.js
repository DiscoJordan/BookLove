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


// cover: {
//     url: { type: String, required: false },
//     // public_id: { type: String, required: false, unique: true },
//     signature: { type: String, required: false },
//   },
//   title: { type: String, required: true, unique: true },
//   subtitle: { type: String, required: false },
//   description: [
//     {
//       header: { type: String, required: false },
//       descriptionText: { type: String, required: false },
//       pictures: [], // if needed
//     },
//   ],
//   tags: [
//     {
//       type: String,
//       required: true,
//       enum: ["free", "museum", "landscape", "view"],
//     },
//   ], //categories/tags
//   location: { type: String, required: true, unique: true },
//   hours: { type: String, required: true },
//   price: { type: String, required: true },
//   photos: [
//     {
//       url: { type: String, required: false },
//       // public_id: { type: String, required: false, unique: true },
//       signature: { type: String, required: false },
//     },
//   ],

//   //rating
//   //official site
//   //google map with pin
//   //comments block
//   //buttons to share link
// });
const updatePlace = async (req, res) => {
    try {
      const { oldtitle} = req.params;
      const {title} = req.body;
      const uniqePlace = await Places.findOne({title:title})
      console.log(uniqePlace);
      const updates = {};
      if (username) updates.username = username;
      if (password) updates.password = password;
      if (about) updates.about = about;
    
      if (!uniqeUser) {
        await Users.findOneAndUpdate(
            { username: oldusername },
            { $set: updates },
            { new: true, runValidators: true }
          );
        res.status(200).send({ ok: true, data: `User '${username}' was updated` });
      }
      
       else{
          res.status(200).send({ ok: true, data: `Username '${username}' is already taken ` });
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
};
