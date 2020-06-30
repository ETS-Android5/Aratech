const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

//configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//configure cloudinary storage
const storage = cloudinaryStorage({
  cloudinary,
  folder: process.env.NODE_ENV === 'production' ? 'avatars' : 'demo-avatars',
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
