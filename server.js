const express = require("express");
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.post('/upload', (req, res) => {
  // Upload image
    cloudinary.v2.uploader.upload(`data:image/jpg;base64${req.body.image}`, function(
    error,
    result
    ) {
    if (error) {
        return res.status(500).send(error);
    }
    // Send image Url
    console.log(result)
    res.status(200).send({url : result.url})
    });
});

module.exports = server;