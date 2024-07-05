const Places = require("../models/places");
const Users = require("../models/users");
const bcrypt = require("bcryptjs"); // https://github.com/dcodeIO/bcrypt.js#readme
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

const cloudinary = require("cloudinary");
// remember to add your credentials to .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const nodemailer = require("nodemailer");

// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
  // you need to enable the less secure option on your gmail account
  // https://support.google.com/mail/answer/185833?hl=en
  // remember to enter your credentials in the .env file
  // To create application passwrod on Google: https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const send_email = async (req, res) => {
  console.log(req.body);
  const { name, email, subject, message } = req.body;
  const default_subject = "This is a default subject";
  const mailOptions = {
    // to: field is the destination for this outgoing email, your client or admin email, for example. We can also include several email in an array, for example admin's email and user's email from the form. Check out official documentation of nodemailer message: https://nodemailer.com/message/
    // to: [process.env.DESTINATION_EMAIL, email],
    to: process.env.NODEMAILER_EMAIL, // coming from the request body
    replyTo: email, // An email address that will appear on the Reply-To: field
    subject: "New message from " + name,
    // The HTML version of the message -
    html: `<p> 
      ${subject || default_subject} 
      </p><p><pre>
      message: ${message} 
      <br/>
      email of User: ${email}
      </pre></p>`,
  };

  const answerOptions = {
    to: email,
    replyTo: process.env.NODEMAILER_EMAIL,
    subject: "Barcelove",
    html: `<p> 
      'We have successfully received your message', ${name} 
      </p><p><pre>
      We have received your message and will return with a response shortly
      <br/>
      Best regards :Barcelove team
      <br/>
      ${process.env.NODEMAILER_EMAIL} 

      </pre></p>`,
  };
  try {
    const success =
      (await transport.sendMail(mailOptions)) &&
      (await transport.sendMail(answerOptions));
    console.log("success: ", success);
    if (success && success.response.includes("OK")) {
      return res.json({ ok: true, message: "email sent" });
    } else {
      return res.json({ ok: false, message: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err.message || err);
    return res.json({ ok: false, message: err.message || err });
  }
};

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

const toggleAdminRights = async (req, res) => {
  try {
    const { username } = req.body;
    const uniqeUser = await Users.findOne({ username: username });

    if (uniqeUser.isAdmin) {
      uniqeUser.isAdmin = false;
      await uniqeUser.save();
      res.status(200).send({
        ok: true,
        data: `Admin Rights of '${username}' was turned off`,
      });
    } else if (!uniqeUser.isAdmin) {
      uniqeUser.isAdmin = true;
      await uniqeUser.save();
      res.status(200).send({
        ok: true,
        data: `Admin Rights of '${username}' was turned on`,
      });
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
    const { newUserData } = req.body;
    const { username, email, password, password2, about, oldpassword, photo } =
      newUserData;
    const uniqeUser = await Users.findById({ _id: req._id });
    let isUserExist = false;
    if (username !== uniqeUser.username) {
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
    // Generate a salt
    const salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    const hash = bcrypt.hashSync(password, salt);
    const updateUser = {
      username: username,
      email: email,
      password: password ? hash : oldpassword,
      about: about,
      photo: {
        photo_url: photo.photo_url,
        public_id: photo.public_id,
      },
    };

    if (uniqeUser && !isUserExist) {
      const user = await Users.findOneAndUpdate(
        { _id: req._id },
        { $set: updateUser },
        { new: true, runValidators: true }
      );

      res.status(200).send({
        ok: true,
        message: `User '${username}' was updated`,
        user: user,
      });
    } else if (!isUserExist) {
      res.status(200).send({
        ok: true,
        message: `Username '${username}' is already taken `,
      });
    }
  } catch (error) {
    res.status(400).send({ ok: false, message: error.message });
    console.log(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const uniqeUser = await Users.findOne({ _id: id })
      .populate("wishes")
      .populate("visited");

    if (uniqeUser) {
      res.status(200).send({ ok: true, data: uniqeUser });
    } else {
      res.status(200).send({
        ok: true,
        data: `Username '${uniqeUser.username}' was not found `,
      });
    }
  } catch (error) {
    res.status(400).send({ ok: false, data: error.message });
    console.log(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await Users.find({});
    users = JSON.parse(JSON.stringify(users));
    if (users) {
      res.status(200).send({ ok: true, data: users });
    } else {
      res.status(200).send({ ok: true, data: `Users ` });
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
  send_email,
  getAllUsers,
  toggleAdminRights,
};
