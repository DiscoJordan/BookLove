const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  cover: {
    photo_url: {
      type: String,
      required: false,
      default:
        "https://storage.googleapis.com/aqacentor-corporativewebs-pro--corporative-web--wp--pro--static/1/2022/08/image1-5.jpg",
    },
    public_id: { type: String, required: false, unique: true },
    signature: { type: String, required: false },
  },
  title: { type: String, required: true, unique: true },
  subtitle: { type: String, required: false },
  description: {
    header: { type: String, required: false },
    descriptionText: { type: String, required: false },
  },
  tags: [
    {
      tag: { type: String, required: true },
      id: { type: String, required: false },
    },
  ], //categories/tags
  location: { type: String, required: true, unique: false },
  coordinates: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  hours: [{ type: String, required: false }],
  price: { type: Number, required: true },
  website: { type: String, required: false },
  photos: [
    {
      photo_url: { type: String, required: false },
      public_id: { type: String, required: false, unique: true },
      signature: { type: String, required: false },
    },
  ],

  //rating
  //official site
  //google map with pin
  //comments block
  //buttons to share link
});

module.exports = mongoose.model("place", placeSchema);

// Main cover photo /
// Title /
// Location /
// Categories of place (Example : museum, free, in City, In the countryside, park) /
// Add to Want to visit button ( only for logged in users ) /
// I visited this place ( only for logged in users ) /
// Subtitle /
// Rating /
// Description /
// Opening hours /
// Price/
// Official site of place ( if it exists ) /
// Carousel of photos /
// Google map with pin /
// Comments block ( only for logged in users ) /
// Buttons to share a link of place in social media /
