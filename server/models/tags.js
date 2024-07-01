const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tagTitle: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("tag", tagSchema);
