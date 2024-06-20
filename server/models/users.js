const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    isAdmin: { type: Boolean, default: false },
    photo: {
    url: { type: String, required: false },
    // public_id: { type: String, required: false, unique: true },
    signature: { type: String, required: false },
  },
  about: { type: String, required: false },
  badge: { type: Number, required: true, default:0},
  photos: [
    {
      url: { type: String, required: false },
    //   public_id: { type: String, required: false, unique: true },
      signature: { type: String, required: false },
    },
  ],
  wishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "place" }],
  visited: [{ type: mongoose.Schema.Types.ObjectId, ref: "place" }],
  //  socialmedia: [{ type: String, required: false}],
  //  Country( You can set flag of your country ) /
  //   visitedlist: { type: Number, required: true },
  //   favouriteList: { type: Number, required: true },
  // Achivements section ( Example: SagradaVisitor, 10 places Visited, King of Barcelona )
});
// Photo (optional) /
// Name/Nickname /
// About /
// Social media links /
// Country ( You can set flag of your country ) /
// Badge ( Example: visited 12 places ) /
// List of Want to visit places ( user want to visit ) /
// List of visited places ( user visited this place ) /
// Achivements section ( Example: SagradaVisitor, 10 places Visited, King of Barcelona ) /
// Photos from visited places( optional )

module.exports = mongoose.model("user", userSchema);
