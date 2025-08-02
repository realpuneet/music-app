const express = require("express");
const songModel = require("../models/song.model");
const multer = require("multer");
const uploadFile = require("../services/storage.service");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  // console.log("req.body:", req.body);   // Form fields
  // console.log("req.file:", req.file);   // Uploaded file info
  // res.send("Received");

  const buffer = req.file.buffer;
  const base64File = Buffer.from(buffer).toString("base64");
  const result = await uploadFile(base64File, "firstFile");
  console.log(result);
  res.status(201).json({ message: "File uploaded to cloud!" });
});

module.exports = router;
