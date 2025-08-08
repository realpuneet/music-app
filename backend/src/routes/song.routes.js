const express = require("express");
const songModel = require("../models/song.model");
const multer = require("multer");
const uploadFile = require("../services/storage.service");
const id3 = require("node-id3");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  // console.log("req.body:", req.body);   // Form fields
  // console.log("req.file:", req.file);   // Uploaded file info
  // res.send("Received");

  try {
    const buffer = req.file.buffer;
    const base64File = Buffer.from(buffer).toString("base64");
    const result = await uploadFile(base64File, "firstFile");
    const response = id3.read(buffer);
    const coverImage = await uploadFile(
      Buffer.from(response.image.imageBuffer).toString("base64"),
      "coverImage"
    );

    const newSong = await songModel.create({
      title: response.title,
      album: response.album,
      artist: response.artist,
      releaseYear: response.year,
      audioUrl: result.url,
      coverUrl: coverImage.url,
    });
    res.status(201).json({ message: "File uploaded to cloud!", newSong });

    console.log(result.url);
    console.log(coverImage.url);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in file uploading..." });
  }
});

router.get("/songs", async (req, res) => {
  try {
    const songs = await songModel.find();
    res.status(200).json({
      msg: "songs fetched",
      songs: songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});


module.exports = router;
