const cloudinary = require("cloudinary");

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  name: CLOUD_NAME,
  key: API_KEY,
  secret: API_SECRET,
});

exports.uploads = async (req, res) => {
  let data = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now}`, // could be "anything"
    resource_typoe: "auto", // jpg, png
  });
  // send images to client
  res.json({
    public_id: data.public_id,
    url: data.secure_url,
  });
};

exports.remove = async (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.upload(image_id, (err, data) => {
    if (err) return res.json({ success: false, err });
    res.send("ok"); // res.status(200)
  });
};
