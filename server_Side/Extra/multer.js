const multer = require('multer');




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


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'profilePicture') {
        cb(null, 'uploads/profile/');
      } else if (file.fieldname === 'panimage') {
        cb(null, 'uploads/panimage/');
      } else {
        cb(new Error('Invalid fieldname'));
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  // Initialize multer with the configured storage
  const upload = multer({ storage: storage });
  

  module.exports = {upload,uploadvenue};