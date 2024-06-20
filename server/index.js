const express = require("express");
var cors = require("cors");
const mongoose = require('mongoose')
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function connecting() {
    try {
      await mongoose.connect("mongodb://127.0.0.1/barcelovedb");
      console.log("Connected to the Barcelove DB");
    } catch (error) {
      console.log(
        "ERROR: Seems like your Barcelove DB is not running, please start it up !!!"
      );
    }
  }

  connecting();
  app.use('/place', require('./routes/places'))
  app.use('/user', require('./routes/users'))

  app.listen(5050, () => {
  console.log("------------server is running------------");
});



