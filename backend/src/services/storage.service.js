var ImageKit = require("imagekit");
require("dotenv").config();


var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file,
    fileName,
    folder: "music-app-audio",
  });

  return result;
}

module.exports = uploadFile;
