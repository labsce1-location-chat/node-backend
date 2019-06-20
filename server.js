const express = require("express");
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());

const cloudinary = require('cloudinary');
// Setting up all necessary configuration for cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.post('/upload', (req, res) => {
  // Upload image, Needs to be in base 64 format
    cloudinary.v2.uploader.upload(`data:image/jpg;base64${req.body.image}`, function(
    error,
    result
    ) {
    if (error) {
        return res.status(500).send(error);
    }
    // Send image Url
    // console.log(result)
    res.status(200).send({url : result.url})
    // This will send a default object back with the url
    // {
    //     url : http://etc.com/fkjsalkfjf.jpg
    // }
    });
});

module.exports = server;