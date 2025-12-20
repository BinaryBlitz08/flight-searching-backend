const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wallet: { type: Number, default: 50000 }
});

module.exports = mongoose.model("User", userSchema);
