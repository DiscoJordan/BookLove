const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  photo: {
    url: { type: String, required: false },
    public_id: { type: String, required: false, unique: true },
    signature: { type: String, required: false },
  },
  name: { type: String, required: true, unique: true },
  about: { type: String, required: false},
  badge: { type: Number, required: true },
  photos: [{
      url: { type: String, required: false },
      public_id: { type: String, required: false, unique: true },
      signature: { type: String, required: false },
      }],
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



