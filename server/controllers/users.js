const Places = require("../models/places");
const Users = require("../models/users");

const displayData = async (req, res) => {
    try {
      res.send({ ok: true, data: `data` });
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
    displayData,
};
