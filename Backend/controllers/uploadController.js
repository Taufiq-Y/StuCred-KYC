const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { Image, Video } = require("../models/Media");

const UploadImage = async (req, res) => {
  try {
    if (req.files) {
      const image = req.body;
      const audio = req.files.audio[0].filename;
      console.log("audio::: ", audio);

      let newImage;
      let newAudio;

      if (image) {
        const imageBuffer = image.image;
        newImage = new Image({ imageData: imageBuffer });
        await newImage.save();
        console.log("Image saved in MongoDB");
      }

      if (audio) {
        const audioBuffer = audio;
        newAudio = new Video({ audioData: audioBuffer });
        await newAudio.save();
        console.log("Audio saved in MongoDB");
      }

      res.status(200).json({ message: "File(s) uploaded successfully" });
    } else {
      res.status(400).json({ message: "No files received" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { UploadImage };
