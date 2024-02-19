const mongoose = require("mongoose");
const { atlasDB } = require("../Datas");

const connectDB = async () => {
  try {
    await mongoose.connect(atlasDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
