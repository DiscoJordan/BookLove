const express = require("express");
var cors = require("cors");
const mongoose = require('mongoose')
const app = express();
app.use(cors());
const port = process.env.port || 5050;
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('debug',true)
async function connecting() {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to the Barcelove DB");
    } catch (error) {
      console.log(
       error
      );
    }
  }

  connecting();
  app.use('/place', require('./routes/places'))
  app.use('/user', require('./routes/users'))

  app.listen(port, () => console.log(`server listening on port ${port}`));



