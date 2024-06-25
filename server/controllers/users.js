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
    const existingUser= await Users.findOne({ username:username });
    if (existingUser) return res.json({ ok: false, message: "This username already exists!" });
    const existingEmail = await Users.findOne({ email: email });
    if (existingEmail) return res.json({ ok: false, message: "This email already exists" });

    // Generate a salt
    const salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      username:username,  
      email:email,
      password: hash,
      isAdmin: username === "admin"
    };
    await Users.create(newUser);
    res.json({ ok: true, message: "Successfully registered" });
  } catch (error) {
    console.log(error);
    res.json({ ok: false, error:error });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ ok: false, message: "All fields are required" });
    }
    try {
      const user = await Users.findOne({ username:username });
      if (!user) return res.json({ ok: false, message: "Invalid user provided" });
  
      const match = bcrypt.compareSync(password, user.password);
      if (match) {
        const token = jwt.sign({ username: user.userName }, jwt_secret, {
          expiresIn: "1h",
        });
        res.json({ ok: true, message: "welcome back", token:token, user:user });
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

const updateUser = async (req, res) => {
  try {
    const { oldusername } = req.params;
    const uniqeUser = await Users.findOne({ username: username });
   
    if (!uniqeUser) {
     const user =  await Users.findOneAndUpdate(
        { username: oldusername },
        { $set: req.bod },
        { new: true, runValidators: true }
      );
      if (!username) {
        res
          .status(200)
          .send({ ok: true, data: `User '${oldusername}' was updated`, user:user });
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
  loginUser,
  verifyToken,
};
