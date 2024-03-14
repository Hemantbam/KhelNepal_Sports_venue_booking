const multer = require('multer');

// Set up storage using disk storage
const profilestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile/') // Destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    // Use original filename for the uploaded file
    cb(null, file.originalname)
  }
});

// Initialize multer with the configured storage
const upload = multer({ storage: profilestorage });



const venuestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/venues/') // Destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    // Use original filename for the uploaded file
    cb(null, file.originalname)
  }
});

// Initialize multer with the configured storage
  const uploadvenue = multer({ storage: venuestorage });
  module.exports = {upload,uploadvenue};