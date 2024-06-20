const Places = require("../models/places");
const Users = require("../models/users");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const uniqeUser = await Users.findOne({ username: username });
    if (!uniqeUser) {
      await Users.create({
        username: username,
        password: password,
        isAdmin: username === "admin",
      });
      res
        .status(200)
        .send({ ok: true, data: `User '${username}' was created` });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Username '${username}' is already taken` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;
    const uniqeUser = await Users.findOne({ username: username });

    if (uniqeUser) {
      await uniqeUser.deleteOne();
      res
        .status(200)
        .send({ ok: true, data: `Username '${username}' was deleted ` });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Username '${username}' was not found` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { oldusername } = req.params;
    const { username, password, about } = req.body;
    const uniqeUser = await Users.findOne({ username: username });
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
      if (username.length<1) {
        res
          .status(200)
          .send({ ok: true, data: `User '${oldusername}' was updated` });
      } else {
        res
          .status(200)
          .send({ ok: true, data: `User '${username}' was updated` });
      }
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

const getUser = async (req, res) => {
  try {
    const { username } = req.body;
    const uniqeUser = await Users.findOne({ username: username });

    if (uniqeUser) {
      res.status(200).send({ ok: true, data: uniqeUser });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Username '${username}' was not found ` });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
  updateUser,
  getUser,
  deleteUser,
};
