const Places = require("../models/places");
const Users = require("../models/users");

const displayDataOfPlaces = async (req, res) => {
    try {
      res.send({ ok: true, data: `data of places` });
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
    displayDataOfPlaces,
};
