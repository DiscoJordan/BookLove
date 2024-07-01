const Places = require("../models/places");
const Users = require("../models/users");
const bcrypt = require("bcryptjs"); // https://github.com/dcodeIO/bcrypt.js#readme
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  if (!username || !email || !password || !password2) {
    return res.json({ ok: false, message: "All fields required" });
  }
  if (password !== password2) {
    return res.json({ ok: false, message: "Passwords must match" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ ok: false, message: "Invalid email" });
  }
  try {
    const existingUser = await Users.findOne({ username: username });
    if (existingUser)
      return res.json({ ok: false, message: "This username already exists!" });
    const existingEmail = await Users.findOne({ email: email });
    if (existingEmail)
      return res.json({ ok: false, message: "This email already exists" });

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      username: username,
      email: email,
      password: hash,
      isAdmin: false,
    };
    await Users.create(newUser);
    res.json({ ok: true, message: "Successfully registered" });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error: error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ ok: false, message: "All fields are required" });
  }
  try {
    const user = await Users.findOne({ username: username });
    if (!user) return res.json({ ok: false, message: "Invalid user provided" });

    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userName: user.username, isAdmin: user.isAdmin, id: user._id },
        jwt_secret,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        ok: true,
        message: "Succsessfull!",
        token: token,
        user: user,
      });
    } else return res.json({ ok: false, message: "Invalid data provided" });
  } catch (error) {
    res.json({ ok: false, error });
  }
};
const verifyToken = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "Token is corrupted" })
      : res.json({ ok: true, succ });
  });
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

const ObjectId = require("mongoose").Types.ObjectId;

const editPlaceList = async (req, res) => {
  try {
    const { username, placeId, update, value } = req.body;
    const opposite = update === "wishes" ? "visited" : "wishes";
    const foundUser = await Users.findOne({ username });
    const objectPlaceId = new ObjectId(placeId);
    if (foundUser[opposite].some((e) => e._id.equals(objectPlaceId))) {
      foundUser[opposite] = foundUser[opposite].filter(
        (e) => !e._id.equals(objectPlaceId)
      );
    }
    if (value) {
      // adding
      foundUser[update].push(objectPlaceId);

      await foundUser.save();
      res.status(200).send({
        ok: true,
        data: `Place was added to ${update} list `,
        foundUser,
      });
    } else {
      // removing
      foundUser[update] = foundUser[update].filter(
        (e) => !e._id.equals(objectPlaceId)
      );
      await foundUser.save();
      res.status(200).send({
        ok: true,
        data: `Place was removed from ${update} list `,
        foundUser,
      });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { newUserData, oldusername } =
      req.body;
      const {username, email, password, password2, about,oldpassword} = newUserData
    const uniqeUser = await Users.findOne({ username: oldusername });
    let isUserExist = false
    if (username!==oldusername) {
      isUserExist = await Users.findOne({ username: username });
    }
    
    if (!username || !email) {
      return res.json({ ok: false, message: "Not all required fields filled" });
    }
    if (isUserExist) {
      return res.json({ ok: false, message: "Username already exist" });
    }
    if (password !== password2) {
      return res.json({ ok: false, message: "Passwords must match" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ ok: false, message: "Invalid email" });
    }

    const updateUser = {
      username: username,
      email: email,
      password: password ? password.hash:oldpassword,
      about: about,
    };

    if (uniqeUser && !isUserExist) {
      const user = await Users.findOneAndUpdate(
        { username: oldusername },
        { $set: updateUser },
        { new: true, runValidators: true }
      );

      res
        .status(200)
        .send({ ok: true, data: `User '${username}' was updated`, user: user });
    } else if(!isUserExist) {
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
    const { id } = req.params;
    const uniqeUser = await Users.findOne({ id: id })
      .populate("wishes")
      .populate("visited");

    if (uniqeUser) {
      res.status(200).send({ ok: true, data: uniqeUser });
    } else {
      res
        .status(200)
        .send({ ok: true, data: `Username '${uniqeUser.username}' was not found ` });
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
  loginUser,
  verifyToken,
  editPlaceList,
};
