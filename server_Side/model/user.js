const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  PAN: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  venuereq: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  address: {
    street: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    postalCode: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
  },
  businessDetails: {
    businessName: {
      type: String,
      default: null,
    },
    registrationNumber: {
      type: String,
      default: null,
    },
    taxIdentificationNumber: {
      type: String,
      default: null,
    },
  },
  profilePicture: {
    type: String,
    default: '/upload/404404.svg',
  },
  role: {
    type: String,
    enum: ['admin', 'basic', 'venue'],
    default: 'basic',
  },
  resetToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
