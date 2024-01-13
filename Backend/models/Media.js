const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageData: { type: String, required: true },
});

const videoSchema = new mongoose.Schema({
  audioData: { type: String },
});

const Image = mongoose.model("Image", imageSchema);
const Video = mongoose.model("Video", videoSchema);

module.exports = { Image, Video };
